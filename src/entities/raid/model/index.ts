import { writable } from 'svelte/store'

export const subscribeClientId = writable<number | undefined>()
