import type { GachaData } from '$entities/gacha/type'
import { writable } from 'svelte/store'

type GachaStore = {
	clickedGacha: GachaData | null
}

const createGachaStore = () => {
	const { subscribe, update } = writable<GachaStore>({
		clickedGacha: null
	})
	return {
		subscribe,
		selectGacha: (data: GachaData | null) => {
			update((prev) => ({ ...prev, clickedGacha: data }))
		}
	}
}
export const gachaStore = createGachaStore()
