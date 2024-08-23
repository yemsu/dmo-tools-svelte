import type { ServerType } from '$entities/raid/types'
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
			subscribe((value) => toast.on(`게임 서버가 ${value}로 설정되었습니다.`))
		}
	}
}
export const crrServerType = createCrrServerType()
