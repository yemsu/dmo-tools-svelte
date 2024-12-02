import { STATS, type StatType } from '$entities/seals'
import { getMergedResult } from '$features/calculate-seal-efficiency'
import type { CalcMode, ListViewMode, SealEfficiency } from '../types'
import { writable } from 'svelte/store'

type CalculatorStore = {
	statTypeSelected: StatType
	goalStat: number | ''
	effDataListSorted: SealEfficiency[]
	calcResultList: SealEfficiency[]
	willGetStatTotal: number
	willNeedMoneyTotal: number
	listViewMode: ListViewMode
	calcMode: CalcMode
	isSealPriceChanged: boolean
}

const createCalculatorStore = () => {
	const { subscribe, update } = writable<CalculatorStore>({
		statTypeSelected: STATS[0].type,
		goalStat: '',
		effDataListSorted: [],
		calcResultList: [],
		willGetStatTotal: 0,
		willNeedMoneyTotal: 0,
		listViewMode: 'merged',
		calcMode: 'closest',
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
		setGoalStat: (goalStat: number | '') => {
			update((prev) => ({ ...prev, goalStat }))
		},
		toggleListViewMode: () => {
			update((prev) => ({
				...prev,
				listViewMode: prev.listViewMode === 'merged' ? 'separated' : 'merged'
			}))
		},
		setEffDataListSorted: (effDataListSorted: SealEfficiency[]) => {
			update((prev) => ({
				...prev,
				effDataListSorted
			}))
		},
		setCalcResultList: (effDataListSorted: SealEfficiency[]) => {
			update((prev) => ({
				...prev,
				calcResultList:
					prev.listViewMode === 'merged'
						? getMergedResult(effDataListSorted)
						: effDataListSorted
			}))
		},
		setTotal: ({
			willGetStatTotal,
			willNeedMoneyTotal
		}: {
			willGetStatTotal: number
			willNeedMoneyTotal: number
		}) => {
			update((prev) => ({
				...prev,
				willGetStatTotal,
				willNeedMoneyTotal
			}))
		},
		subtractTotal: ({ willGetStat, needPrice }: SealEfficiency) => {
			update((prev) => ({
				...prev,
				willGetStatTotal: prev.willGetStatTotal - willGetStat,
				willNeedMoneyTotal: prev.willNeedMoneyTotal - needPrice
			}))
		},
		setIsSealPriceChanged: (isSealPriceChanged: boolean) => {
			update((prev) => ({ ...prev, isSealPriceChanged }))
		},
		reset: () => {
			update((prev) => ({
				...prev,
				effDataListSorted: [],
				calcResultList: [],
				willGetStatTotal: 0,
				willNeedMoneyTotal: 0,
				isSealPriceChanged: false
			}))
		}
	}
}

export const calcStore = createCalculatorStore()
