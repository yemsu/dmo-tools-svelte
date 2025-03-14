import type { SealPriceHistory, Stats } from '$entities/seals/type'
import { writable } from 'svelte/store'

export const isShowMySealPopup = writable<boolean>(false)

export const myStats = writable<Stats>({
	AT: 0,
	HT: 0,
	CT: 0,
	HP: 0,
	DS: 0,
	DE: 0,
	BL: 0,
	EV: 0
})

export const sealPricesHistory = writable<SealPriceHistory[]>([])
