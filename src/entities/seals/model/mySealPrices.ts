import { getMySealsPrice, putMySealPrice } from '$entities/seals/api'
import { updateOrAddData } from '$entities/seals/lib'
import { ALERT } from '$shared/config'
import type { LangType } from '$shared/types'
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
		updatePrice: async (newData: MyPrice, lang: LangType) => {
			const res = await putMySealPrice(newData)
			if (!res) {
				alert(ALERT.FAILED_UPDATE_SEAL[lang])
				return
			}
			update((prev) => {
				const result = updateOrAddData(prev, res)
				return result
			})
		},
		remove: async (sealId: number) => {
			await putMySealPrice({ id: sealId, price: 0 })
			update((prev) => {
				return prev.filter((prevItem) => prevItem.id !== sealId)
			})
		}
	}
}

export const mySealPrices = createMySealPrices()
