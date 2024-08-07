import type { SealData, SealPrice } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

const createSealPrices = () => {
	const { subscribe, set, update } = writable<SealPrice[]>([])

	return {
		subscribe,
		updatePrice: (sealId: number, price: number) => {
			update((prev) =>
				prev.map((prevPrice) =>
					prevPrice.sealId === sealId ? { ...prevPrice, price } : prevPrice
				)
			)
			subscribe((value) => console.log('price changed', value))
		},
		set: (sealPrices: SealPrice[]) => {
			set(sealPrices)
		}
	}
}
export const sealPrices = createSealPrices()

export const isShowMySealPopup = writable<boolean>(false)
