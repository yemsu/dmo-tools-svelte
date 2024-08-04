import type { MySeal, MyStats, SealData, SealPrice } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

const createMySeals = () => {
	const { subscribe, set, update } = writable<MySeal[]>([])

	return {
		subscribe,
		add: (...newMySeals: MySeal[]) => {
			update((prev) => [...prev, ...newMySeals])
		},
		modify: (newMySeal: MySeal) => {
			update((prev) =>
				prev.map((mySeal) => {
					if (mySeal.id === newMySeal.id) {
						return newMySeal
					} else {
						return mySeal
					}
				})
			)
		},
		remove: (sealName: string) =>
			update((prev) => [...prev.filter(({ name }) => name !== sealName)]),
		reset: () => set([])
	}
}

export const mySeals = createMySeals()
export const myStats = writable<MyStats>()

export const sealPrices = writable<SealPrice[]>([])
