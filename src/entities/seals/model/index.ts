import type { SealData } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])
export const isShowMySealPopup = writable<boolean>(false)
