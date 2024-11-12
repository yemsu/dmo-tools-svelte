import { GAME_SERVERS } from '$entities/raid/config'
import type { ServerType } from '$entities/raid/types'
import { TOAST } from '$shared/config'
import { lang } from '$shared/model'
import { toast } from '$shared/toast'
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
		set: (serverType: ServerType) => {
			localStorage.setItem(NAME, `${serverType}`)
			set(serverType)
			subscribe(($currentServerType) =>
				lang.subscribe(($lang) => {
					toast.on(
						TOAST.CHANGE_RAID_SERVER(GAME_SERVERS[$currentServerType])[$lang]
					)
				})
			)
		}
	}
}
export const crrServerType = createCrrServerType()
