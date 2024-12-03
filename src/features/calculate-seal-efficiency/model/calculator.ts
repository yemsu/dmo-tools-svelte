import { STATS, type StatType } from '$entities/seals'
import {
	getCalcResultTotal,
	getMergedResult
} from '$features/calculate-seal-efficiency'
import type {
	CalcMode,
	ViewMode,
	SealEfficiency,
	CalcResultList,
	CalcTotalData
} from '../types'
import { writable } from 'svelte/store'

type CalculatorStore = {
	statTypeSelected: StatType
	goalStat: number | null
	effDataListSorted: SealEfficiency[]
	calcResults: CalcResultList
	resultTotal: CalcTotalData
	viewMode: ViewMode
	calcMode: CalcMode
	isSealPriceChanged: boolean
}

const createCalculatorStore = () => {
	const { subscribe, update } = writable<CalculatorStore>({
		statTypeSelected: STATS[0].type,
		goalStat: null,
		effDataListSorted: [],
		calcResults: {
			efficiency: {
				merged: [],
				separated: []
			},
			closest: {
				merged: [],
				separated: []
			}
		},
		resultTotal: {
			efficiency: {
				willGetStat: 0,
				willNeedMoney: 0
			},
			closest: {
				willGetStat: 0,
				willNeedMoney: 0
			}
		},
		viewMode: 'merged',
		calcMode: 'efficiency',
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
		toggleCalcMode: (isToggleOn: true) => {
			update((prev) => ({
				...prev,
				calcMode: isToggleOn ? 'closest' : 'efficiency'
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
			getCalcResultClosest: (
				effDataListSorted: SealEfficiency[],
				goalStat: number,
				effResult: SealEfficiency[],
				effWillGetStat: number
			) => SealEfficiency[]
		) => {
			const getNewResult = (
				calcMode: CalcMode,
				effListForNeedStat: SealEfficiency[]
			) => {
				return (prev: CalculatorStore) => {
					if (calcMode === 'closest') {
						effListForNeedStat = getCalcResultClosest(
							prev.effDataListSorted,
							prev.goalStat || 0,
							prev.calcResults.efficiency.separated,
							prev.resultTotal.efficiency.willGetStat
						)
					}
					return {
						...prev,
						calcResults: {
							...prev.calcResults,
							[calcMode]: {
								merged: getMergedResult(effListForNeedStat),
								separated: effListForNeedStat
							}
						},
						resultTotal: {
							...prev.resultTotal,
							[calcMode]: getCalcResultTotal(effListForNeedStat, percentNum)
						}
					}
				}
			}
			update(getNewResult('efficiency', effListForNeedStat))
			setTimeout(() => {
				update(getNewResult('closest', effListForNeedStat))
			}, 1000)
		},

		subtractResultTotal: (effData: SealEfficiency, percentNum: number) => {
			const calcModes: CalcMode[] = ['efficiency', 'closest']
			calcModes.forEach((calcMode) => {
				update((prev) => {
					const prevResultData = prev.calcResults[calcMode].separated
					const newEffResults = prevResultData.filter(
						(item) =>
							!(item.id === effData.id && item.needCount === effData.needCount)
					)
					if (newEffResults.length === prevResultData.length) {
						return prev
					}
					const prevResultTotal = prev.resultTotal[prev.calcMode]

					return {
						...prev,
						calcResults: {
							...prev.calcResults,
							[calcMode]: {
								separated: newEffResults,
								merged: getMergedResult(newEffResults)
							}
						},
						resultTotal: {
							...prev.resultTotal,
							[calcMode]: {
								willGetStat:
									(prevResultTotal.willGetStat - effData.willGetStat) /
									percentNum,
								willNeedMoney: prevResultTotal.willNeedMoney - effData.needPrice
							}
						}
					}
				})
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
					efficiency: {
						merged: [],
						separated: []
					},
					closest: {
						merged: [],
						separated: []
					}
				},
				resultTotal: {
					efficiency: {
						willGetStat: 0,
						willNeedMoney: 0
					},
					closest: {
						willGetStat: 0,
						willNeedMoney: 0
					}
				},
				isSealPriceChanged: false
			}))
		}
	}
}

export const calc = createCalculatorStore()
