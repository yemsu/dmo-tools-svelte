import { STATS, type StatType } from '$entities/seals'
import {
	getCalcResultTotal,
	getMergedResult
} from '$features/calculator/calculate-seal-efficiency'
import type {
	CalcResultList,
	CalcTotalData,
	SealEfficiency,
	ViewMode
} from '../types'
import { writable } from 'svelte/store'

type CalculatorStore = {
	statTypeSelected: StatType
	goalStat: number | null
	effDataListSorted: SealEfficiency[]
	calcResults: CalcResultList
	resultTotal: CalcTotalData
	viewMode: ViewMode
	isSealPriceChanged: boolean
}

const createCalculatorStore = () => {
	const { subscribe, update } = writable<CalculatorStore>({
		statTypeSelected: STATS[0].type,
		goalStat: null,
		effDataListSorted: [],
		calcResults: {
			merged: [],
			separated: []
		},
		resultTotal: {
			willGetStat: 0,
			willNeedMoney: 0,
			efficiency: 0
		},
		viewMode: 'merged',
		isSealPriceChanged: false
	})

	return {
		subscribe,
		selectStatType: (statTypeSelected: StatType) => {
			update((prev) => ({
				...prev,
				statTypeSelected
			}))
		},
		setGoalStat: (goalStat: number | null) => {
			update((prev) => ({ ...prev, goalStat }))
		},
		toggleViewMode: (isToggleOn: true) => {
			update((prev) => ({
				...prev,
				viewMode: isToggleOn ? 'merged' : 'separated'
			}))
		},
		setEffDataListSorted: (effDataListSorted: SealEfficiency[]) => {
			update((prev) => ({
				...prev,
				effDataListSorted
			}))
		},
		setCalcResultList: (
			effListForNeedStat: SealEfficiency[],
			percentNum: number,
			getCalcResultCost: (
				effDataListSorted: SealEfficiency[],
				goalStat: number,
				effResult: SealEfficiency[],
				effWillGetStat: number
			) => SealEfficiency[]
		) => {
			const mergedResultVanilla = getMergedResult(effListForNeedStat)
			const separatedResultVanilla = effListForNeedStat
			const resultTotalVanilla = getCalcResultTotal(
				effListForNeedStat,
				percentNum
			)
			const resultsVanilla = {
				merged: mergedResultVanilla,
				separated: separatedResultVanilla
			}
			// efficiency 업데이트 완료 후 cost 업데이트
			update((prev) => {
				const separatedResultLowPrice = getCalcResultCost(
					prev.effDataListSorted,
					prev.goalStat || 0,
					separatedResultVanilla,
					resultTotalVanilla.willGetStat
				)
				const hasResultLowPrice = separatedResultLowPrice.length > 0
				const resultsLowPrice = {
					merged: getMergedResult(separatedResultLowPrice),
					separated: separatedResultLowPrice
				}
				const resultTotalLowPrice = getCalcResultTotal(
					separatedResultLowPrice,
					percentNum
				)
				return {
					...prev,
					calcResults: hasResultLowPrice ? resultsLowPrice : resultsVanilla,
					resultTotal: hasResultLowPrice
						? resultTotalLowPrice
						: resultTotalVanilla
				}
			})
		},
		subtractResultTotal: (effData: SealEfficiency, percentNum: number) => {
			update((prev) => {
				const prevResultData = prev.calcResults.separated
				const newEffResults = prevResultData.filter(
					(item) =>
						!(item.id === effData.id && item.needCount === effData.needCount)
				)
				if (newEffResults.length === prevResultData.length) {
					return prev
				}

				return {
					...prev,
					calcResults: {
						separated: newEffResults,
						merged: getMergedResult(newEffResults)
					},
					resultTotal: {
						willGetStat:
							(prev.resultTotal.willGetStat - effData.willGetStat) / percentNum,
						willNeedMoney: prev.resultTotal.willNeedMoney - effData.needPrice,
						efficiency: prev.resultTotal.efficiency - effData.efficiency
					}
				}
			})
		},
		setIsSealPriceChanged: (isSealPriceChanged: boolean) => {
			update((prev) => ({ ...prev, isSealPriceChanged }))
		},
		reset: () => {
			update((prev) => ({
				...prev,
				effDataListSorted: [],
				calcResults: {
					merged: [],
					separated: []
				},
				resultTotal: {
					willGetStat: 0,
					willNeedMoney: 0,
					efficiency: 0
				},
				isSealPriceChanged: false
			}))
		}
	}
}

export const calc = createCalculatorStore()
