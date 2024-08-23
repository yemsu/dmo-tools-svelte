import { getMySealsPrice, putMySealPrice } from '$entities/seals/api'
import { updateOrAddData } from '$entities/seals/lib'
import type { MyPrice, MySealPrice } from '../type'
import { writable } from 'svelte/store'

const createMySealPrices = () => {
	const { subscribe, set, update } = writable<MySealPrice[]>([])

	return {
		subscribe,
		load: async () => {
			const res = await getMySealsPrice()
			set(res)
		},
		reset: () => {
			set([])
		},
		updatePrice: async (newData: MyPrice) => {
			const res = await putMySealPrice(newData)
			if (!res) {
				alert('씰 추가/수정에 실패하였습니다.')
				return
			}
			update((prev) => {
				const result = updateOrAddData(prev, res)
				return result
			})
		},
		remove: async (sealId: number) => {
			const res = await putMySealPrice({ id: sealId, price: 0 })
			if (!res) {
				alert('씰 삭제에 실패하였습니다.')
				return
			}
			update((prev) => {
				return prev.filter((prevItem) => prevItem.id !== sealId)
			})
		}
	}
}

export const mySealPrices = createMySealPrices()
