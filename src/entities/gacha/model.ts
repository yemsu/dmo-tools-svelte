import type { GachaData, GachaResultData } from '$entities/gacha/type'
import { writable } from 'svelte/store'

type GachaStore = {
	currentGacha: GachaData | null
	gachaResults: GachaResultData[]
}

const createGachaStore = () => {
	const { subscribe, update } = writable<GachaStore>({
		currentGacha: null,
		gachaResults: []
	})
	return {
		subscribe,
		selectGacha: (data: GachaData | null) => {
			update((prev) => ({ ...prev, currentGacha: data }))
		},
		setGachaResults: (newResults: GachaResultData[]) => {
			update((prev) => ({ ...prev, gachaResults: newResults }))
		}
	}
}
export const gachaStore = createGachaStore()
