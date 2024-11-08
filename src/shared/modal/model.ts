import { writable } from 'svelte/store'

export const globalModalText = writable<{
	title: string
	description: {
		kr: string
		en: string
	}
} | null>(null)
