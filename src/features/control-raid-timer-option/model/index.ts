import { writable } from 'svelte/store'

export const isAudioOn = writable(false)
export const audioAlarm = writable<HTMLAudioElement | undefined>()
export { raidOption } from './raidOption'
