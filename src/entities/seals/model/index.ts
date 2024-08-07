import type { Menus, SealData, SealPrice } from '../type'
import { writable } from 'svelte/store'

export const seals = writable<SealData[]>([])

export const sealPrices = writable<SealPrice[]>([])

export const isShowMySealPopup = writable<boolean>(false)

export const MENUS = ['EVERY', 'CALC', 'MY'] as const
export const activeMenu = writable<Menus>('CALC')
