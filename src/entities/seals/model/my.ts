import { createLoadSaveFn, updateOrAddData } from '$entities/seals/lib'
import { $remove } from '$shared/lib'
import type { MySeal, Stats } from '../type'
import { writable } from 'svelte/store'

const sortBy = <ArrItem extends Record<string, number>>(
	arr: ArrItem[],
	keyName: keyof ArrItem
) => {
	return arr.sort((a, b) => a[keyName] - b[keyName])
}

const MY_SEALS_STORAGE = 'seals'
const { save, load } = createLoadSaveFn(MY_SEALS_STORAGE)
const createMySeals = () => {
	const { subscribe, update } = writable<MySeal[]>([])

	return {
		subscribe,
		loadSavedData: () => {
			const savedData = load()
			if (!savedData) return
			update(() => sortBy([...savedData], 'id'))
		},
		updateCount: (id: number, count: number) => {
			update((prev) => {
				const result = updateOrAddData(prev, { id, count })
				return sortBy([...result], 'id')
			})
			subscribe((value) => save(value))
		},
		remove: (sealId: number) => {
			update((prev) => [...$remove(prev, sealId)])
			subscribe((value) => save(value))
		}
	}
}

export const mySeals = createMySeals()
export const myStats = writable<Stats>({
	AT: 0,
	CT: 0,
	HT: 0
})
