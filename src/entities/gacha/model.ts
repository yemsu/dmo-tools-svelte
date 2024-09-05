import type {
	GachaData,
	GachaResultData,
	InventoryItem
} from '$entities/gacha/type'
import { writable } from 'svelte/store'

type GachaStore = {
	currentGacha: GachaData | null
	results: GachaResultData[]
	inventory: InventoryItem[]
	isLoadingVolumeOn: boolean
	myPlayCounts: Record<number, number>
}

const createGachaStore = () => {
	const { subscribe, update } = writable<GachaStore>({
		currentGacha: null,
		results: [],
		myPlayCounts: {},
		inventory: [],
		isLoadingVolumeOn: true
	})
	return {
		subscribe,
		selectGacha: (data: GachaData | null) => {
			update((prev) => ({ ...prev, currentGacha: data }))
		},
		setResults: (newResults: GachaResultData[]) => {
			const newItems = newResults.map((newResult) => newResult.item)
			update((prev) => {
				const newInventory: InventoryItem[] = [...prev.inventory]
				newItems.forEach((newItem) => {
					const prevItem = newInventory.find(
						({ item }) => item.id === newItem.id
					)
					if (prevItem) {
						prevItem.count += 1
					} else {
						newInventory.push({
							item: newItem,
							count: 1
						})
					}
				})
				return {
					...prev,
					results: newResults,
					inventory: newInventory
				}
			})
		},
		toggleLoadingVolume: () => {
			update((prev) => ({
				...prev,
				isLoadingVolumeOn: !prev.isLoadingVolumeOn
			}))
		},
		addPlayedCount: (gachaId: number, count: number) => {
			update((prev) => ({
				...prev,
				myPlayCounts: {
					...prev.myPlayCounts,
					[gachaId]: (prev.myPlayCounts[gachaId] || 0) + count
				}
			}))
		},
		cleanInventory: () => {
			update((prev) => ({
				...prev,
				myPlayCounts: {},
				inventory: []
			}))
		}
	}
}
export const gachaStore = createGachaStore()
