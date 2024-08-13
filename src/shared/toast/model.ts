import { writable } from 'svelte/store'

const createToastStore = () => {
	const { subscribe, set } = writable<string | undefined>()

	return {
		subscribe,
		on: (text: string) => {
			set(text)
			setTimeout(() => {
				set(undefined)
			}, 3000)
		}
	}
}

export const toast = createToastStore()
