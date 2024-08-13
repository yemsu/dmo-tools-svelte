import { goto } from '$app/navigation'
import type { ServerType } from '$entities/raid/types'
import { writable } from 'svelte/store'

const PARAM_NAME = 'server'
const createCrrServerType = () => {
	const { subscribe, set } = writable<ServerType>()
	return {
		subscribe,
		loadSavedData: (defaultData: ServerType) => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(PARAM_NAME) as ServerType
			if (!savedData) {
				set(defaultData)
				return
			}

			set(savedData)
		},
		set: (serverType: ServerType) => {
			const params = new URLSearchParams(window.location.search)
			params.set(PARAM_NAME, serverType)
			set(serverType)
			goto(`?${params.toString()}`)
		}
	}
}
export const crrServerType = createCrrServerType()
