import { goto } from '$app/navigation'
import type { MySeal, Stats } from '../type'
import { writable } from 'svelte/store'

const sortBy = <ArrItem extends Record<string, number>>(
	arr: ArrItem[],
	keyName: keyof ArrItem
) => {
	return arr.sort((a, b) => a[keyName] - b[keyName])
}

const MY_SEALS_STORAGE = 'seals'

const createMySeals = () => {
	const { subscribe, update } = writable<MySeal[]>([])

	return {
		subscribe,
		loadSavedData: () => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(MY_SEALS_STORAGE)
			if (savedData) {
				update(() => sortBy([...JSON.parse(savedData)], 'id'))
			}
		},
		updateCount: (id: number, count: number) => {
			update((prev) => {
				const prevItem = prev.find((prevItem) => prevItem.id === id)
				let result = []
				if (prevItem) {
					result = prev.map((mySeal) =>
						mySeal.id === id ? { id, count } : mySeal
					)
				} else {
					result = [...prev, { id, count }]
				}
				return sortBy([...result], 'id')
			})
			const params = new URLSearchParams(window.location.search)
			subscribe((value) => {
				params.set(MY_SEALS_STORAGE, JSON.stringify(value))
				goto(`?${params.toString()}`)
				localStorage.setItem(MY_SEALS_STORAGE, JSON.stringify(value))
			})
		},
		remove: (sealId: number) => {
			update((prev) => [...prev.filter(({ id }) => id !== sealId)])
			subscribe((value) => {
				localStorage.setItem(MY_SEALS_STORAGE, JSON.stringify(value))
			})
		}
	}
}

export const mySeals = createMySeals()
export const myStats = writable<Stats>()
