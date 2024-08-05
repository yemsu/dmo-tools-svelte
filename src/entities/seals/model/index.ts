import type { MySeal, MyStats, SealData, SealPrice } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

const sortBy = <ArrItem extends Record<string, number>>(
	arr: ArrItem[],
	keyName: keyof ArrItem
) => {
	return arr.sort((a, b) => a[keyName] - b[keyName])
}

const createMySeals = () => {
	const { subscribe, set, update } = writable<MySeal[]>([])

	return {
		subscribe,
		add: (...newMySeals: MySeal[]) => {
			update((prev) => sortBy([...prev, ...newMySeals], 'sealId'))
		},
		modify: (newMySeal: MySeal) => {
			update((prev) =>
				prev.map((mySeal) => {
					if (mySeal.sealId === newMySeal.sealId) {
						return newMySeal
					} else {
						return mySeal
					}
				})
			)
		},
		remove: (_sealId: number) =>
			update((prev) => [...prev.filter(({ sealId }) => sealId !== _sealId)]),
		reset: () => set([])
	}
}

export const mySeals = createMySeals()
export const myStats = writable<MyStats>()

export const sealPrices = writable<SealPrice[]>([])
export const mySealPrices = writable<SealPrice[]>([])
