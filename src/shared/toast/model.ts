import { writable } from 'svelte/store'

let timer: NodeJS.Timeout | undefined
const createToastStore = () => {
	const { subscribe, set } = writable<string | undefined>()

	return {
		subscribe,
		on: (text: string) => {
			set(text)
			if (timer) clearTimeout(timer)
			timer = setTimeout(() => {
				set(undefined)
			}, 3000)
		}
	}
}

export const toast = createToastStore()
