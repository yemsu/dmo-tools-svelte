import { goto } from '$app/navigation'
import type { MyPrice, SealData, SealPrice } from '$entities/seals/type'
import { writable } from 'svelte/store'

const MY_PRICE_STORAGE = 'prices'
const save = (myPrices: MyPrice[]) => {
	const params = new URLSearchParams(window.location.search)
	params.set(MY_PRICE_STORAGE, JSON.stringify(myPrices))
	goto(`?${params.toString()}`)
}
const createMyPrices = () => {
	const { subscribe, set, update } = writable<MyPrice[]>([])

	return {
		subscribe,
		loadSavedData: () => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(MY_PRICE_STORAGE)
			if (savedData) {
				set([...JSON.parse(savedData)])
			}
		},
		updatePrice: (id: SealData['id'], price: number) => {
			update((prev) => {
				const prevItem = prev.find((prevItem) => prevItem.id === id)
				let result = []
				if (prevItem) {
					result = prev.map((myPrice) =>
						myPrice.id === id ? { id, price } : myPrice
					)
				} else {
					result = [...prev, { id, price }]
				}
				return result
			})
			subscribe((value) => save(value))
		},
		remove: (sealId: number) => {
			update((prev) => [...prev.filter(({ id }) => id !== sealId)])
			subscribe((value) => save(value))
		}
	}
}

export const sealPrices = writable<SealPrice[]>([])
export const myPrices = createMyPrices()
