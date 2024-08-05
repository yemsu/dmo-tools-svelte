import type { MySeal, Stats, SealData, SealPrice } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

const sortBy = <ArrItem extends Record<string, number>>(
	arr: ArrItem[],
	keyName: keyof ArrItem
) => {
	return arr.sort((a, b) => a[keyName] - b[keyName])
}

const MY_SEALS_STORAGE = 'DMO_MYS'
const createMySeals = () => {
	const { subscribe, update } = writable<MySeal[]>([])

	return {
		subscribe,
		loadSavedData: () => {
			const savedData = localStorage.getItem(MY_SEALS_STORAGE)
			if (savedData) {
				update((prev) => sortBy([...prev, ...JSON.parse(savedData)], 'sealId'))
			}
		},
		updateCount: (sealId: number, count: number) => {
			update((prev) => {
				const prevItem = prev.find((prevItem) => prevItem.sealId === sealId)
				if (prevItem) {
					return prev.map((mySeal) =>
						mySeal.sealId === sealId ? { sealId, count } : mySeal
					)
				} else {
					return [...prev, { sealId, count }]
				}
			})
			subscribe((value) => {
				localStorage.setItem(MY_SEALS_STORAGE, JSON.stringify(value))
			})
		},
		remove: (_sealId: number) => {
			update((prev) => [...prev.filter(({ sealId }) => sealId !== _sealId)])
			subscribe((value) => {
				localStorage.setItem(MY_SEALS_STORAGE, JSON.stringify(value))
			})
		}
	}
}

export const mySeals = createMySeals()
export const myStats = writable<Stats>()

export const sealPrices = writable<SealPrice[]>([])
export const mySealPrices = writable<SealPrice[]>([])

export const isShowMySealPopup = writable<boolean>(false)
