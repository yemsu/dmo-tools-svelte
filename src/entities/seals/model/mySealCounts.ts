import { getMySealsCount, putMySealCount } from '$entities/seals/api'
import { updateOrAddData } from '$entities/seals/lib'
import { ALERT } from '$shared/config'
import type { LangType } from '$shared/types'
import type { MySealCount } from '../type'
import { writable } from 'svelte/store'

const sortBy = <ArrItem extends Record<string, number>>(
	arr: ArrItem[],
	keyName: keyof ArrItem
) => {
	return arr.sort((a, b) => a[keyName] - b[keyName])
}

const createMySealCounts = () => {
	const { subscribe, set, update } = writable<MySealCount[]>([])

	return {
		subscribe,
		load: async () => {
			const res = await getMySealsCount()
			set(sortBy(res, 'id'))
		},
		reset: () => {
			set([])
		},
		updateCount: async (newData: MySealCount, lang: LangType) => {
			const res = await putMySealCount(newData)
			if (!res) {
				alert(ALERT.FAILED_UPDATE_SEAL[lang])
				return
			}
			update((prev) => {
				const result = updateOrAddData(prev, res)
				return sortBy([...result], 'id')
			})
		},
		remove: async (sealId: number) => {
			await putMySealCount({ id: sealId, count: 0 })
			update((prev) => {
				return prev.filter((prevItem) => prevItem.id !== sealId)
			})
		}
	}
}

export const mySealCounts = createMySealCounts()
