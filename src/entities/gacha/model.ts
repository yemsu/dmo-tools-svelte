import type { GachaData, GachaResultData } from '$entities/gacha/type'
import { writable } from 'svelte/store'

type GachaStore = {
	currentGacha: GachaData | null
	gachaResults: GachaResultData[]
	isLoadingVolumeOn: boolean
}

const createGachaStore = () => {
	const { subscribe, update } = writable<GachaStore>({
		currentGacha: null,
		gachaResults: [],
		isLoadingVolumeOn: true
	})
	return {
		subscribe,
		selectGacha: (data: GachaData | null) => {
			update((prev) => ({ ...prev, currentGacha: data }))
		},
		setGachaResults: (newResults: GachaResultData[]) => {
			update((prev) => ({ ...prev, gachaResults: newResults }))
		},
		toggleLoadingVolume: () => {
			update((prev) => ({
				...prev,
				isLoadingVolumeOn: !prev.isLoadingVolumeOn
			}))
		}
	}
}
export const gachaStore = createGachaStore()
