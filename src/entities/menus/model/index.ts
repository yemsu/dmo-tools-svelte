import type { Menus } from '$entities/menus/types'
import { writable } from 'svelte/store'

export const activeMenuType = writable<Menus['type']>('SETTING')
