import { GAME_SERVERS } from '$entities/raid/config'
import type { ServerType } from '$entities/raid/types'
import { TOAST } from '$shared/config'
import { toast } from '$shared/toast'
import type { LangType } from '$shared/types'
import { writable } from 'svelte/store'

const NAME = 'DMO_SERVER'
const createCrrServerType = () => {
	const { subscribe, set } = writable<ServerType>()
	return {
		subscribe,
		loadSavedData: (defaultData: ServerType) => {
			const savedData = localStorage.getItem(NAME) as ServerType
			if (!savedData) {
				set(defaultData)
				return
			}

			set(savedData)
		},
		set: (serverType: ServerType, lang: LangType) => {
			localStorage.setItem(NAME, `${serverType}`)
			set(serverType)
			subscribe((value) =>
				toast.on(TOAST.CHANGE_RAID_SERVER(GAME_SERVERS[value])[lang])
			)
		}
	}
}
export const crrServerType = createCrrServerType()
