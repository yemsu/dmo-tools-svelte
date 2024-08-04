import type { MySeal, SealData } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

const createMySeals = () => {
	const { subscribe, set, update } = writable<MySeal[]>([])

	return {
		subscribe,
		add: (...newMySeals: MySeal[]) => {
			update((prev) => [...prev, ...newMySeals])
		},
		remove: (sealName: string) =>
			update((prev) => [...prev.filter(({ name }) => name !== sealName)]),
		reset: () => set([])
	}
}

export const mySeals = createMySeals()
