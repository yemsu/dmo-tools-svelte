import { writable } from 'svelte/store'

export const globalErrorMessage = writable<string | null>(null)
