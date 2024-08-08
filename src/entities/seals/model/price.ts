import { createLoadSaveFn, updateOrAddData } from '$entities/seals/lib'
import type { MyPrice, SealData, SealPrice } from '$entities/seals/type'
import { _remove } from '$shared/lib'
import { writable } from 'svelte/store'

const MY_PRICE_STORAGE = 'prices'
const { save, load } = createLoadSaveFn(MY_PRICE_STORAGE, 'price')
const createMyPrices = () => {
	const { subscribe, set, update } = writable<MyPrice[]>([])

	return {
		subscribe,
		loadSavedData: () => {
			const savedData = load()
			if (!savedData) return
			set([...savedData])
		},
		updatePrice: (id: SealData['id'], price: number) => {
			update((prev) => {
				const result = updateOrAddData(prev, { id, price })
				return result
			})
			subscribe((value) => save(value))
		},
		remove: (sealId: number) => {
			update((prev) => [..._remove(prev, sealId)])
			subscribe((value) => save(value))
		}
	}
}

export const sealPrices = writable<SealPrice[]>([])
export const myPrices = createMyPrices()
