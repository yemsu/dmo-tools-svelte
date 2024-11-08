import type { CharacterData } from '$entities/characters'
import { getMySealsCount, putMySealCount } from '$entities/seals/api'
import { updateOrAddData } from '$entities/seals/lib'
import { ALERT, TOAST } from '$shared/config'
import { toast } from '$shared/toast'
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
		load: async (characterId: CharacterData['id']) => {
			const res = await getMySealsCount(characterId)
			set(sortBy(res, 'id'))
		},
		reset: () => {
			set([])
		},
		updateCount: async (
			characterId: CharacterData['id'],
			newData: MySealCount,
			lang: LangType
		) => {
			const res = await putMySealCount(characterId, newData)
			if (!res) {
				alert(ALERT.FAILED_UPDATE_SEAL[lang])
				return
			}
			update((prev) => {
				const result = updateOrAddData(prev, res)
				return sortBy([...result], 'id')
			})

			toast.on(TOAST.SEAL_COUNT_CHANGED[lang])
		},
		remove: async (characterId: CharacterData['id'], sealId: number) => {
			await putMySealCount(characterId, { id: sealId, count: 0 })
			update((prev) => {
				return prev.filter((prevItem) => prevItem.id !== sealId)
			})
		}
	}
}

export const mySealCounts = createMySealCounts()
