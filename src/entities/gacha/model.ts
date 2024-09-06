import type {
	GachaData,
	GachaDataType,
	GachaResultData,
	InventoryItem
} from '$entities/gacha/type'
import { writable } from 'svelte/store'

type GachaStore = {
	results: GachaResultData[]
	inventory: Record<GachaDataType, InventoryItem[]>
	isResultShow: boolean
	isLoadingVolumeOn: boolean
	myPlayCounts: Record<GachaDataType, Record<GachaData['id'], number>>
}

const DEFAULT_INVENTORY = { DATA_SUMMON: [], DIGITAL_DRAW: [] }
const DEFAULT_PLAY_COUNTS = { DATA_SUMMON: {}, DIGITAL_DRAW: {} }

const createGachaStore = () => {
	const { subscribe, update } = writable<GachaStore>({
		results: [],
		myPlayCounts: DEFAULT_PLAY_COUNTS,
		inventory: DEFAULT_INVENTORY,
		isResultShow: false,
		isLoadingVolumeOn: true
	})
	return {
		subscribe,
		setResults: (
			currentGachaType: GachaDataType,
			newResults: GachaResultData[]
		) => {
			const newItems = newResults.map((newResult) => newResult.item)
			update((prev) => {
				const { inventory } = prev
				const newInventory: InventoryItem[] = [...inventory[currentGachaType]]
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
					inventory: {
						...inventory,
						[currentGachaType]: newInventory
					}
				}
			})
		},
		toggleLoadingVolume: () => {
			update((prev) => ({
				...prev,
				isLoadingVolumeOn: !prev.isLoadingVolumeOn
			}))
		},
		addPlayedCount: (
			currentGachaType: GachaDataType,
			gachaId: number,
			count: number
		) => {
			update((prev) => {
				const { myPlayCounts } = prev
				return {
					...prev,
					myPlayCounts: {
						...myPlayCounts,
						[currentGachaType]: {
							...myPlayCounts[currentGachaType],
							[gachaId]: (myPlayCounts[currentGachaType][gachaId] || 0) + count
						}
					}
				}
			})
		},
		cleanInventory: (currentGachaType: GachaDataType) => {
			update((prev) => ({
				...prev,
				myPlayCounts: { ...prev.myPlayCounts, [currentGachaType]: {} },
				inventory: { ...prev.inventory, [currentGachaType]: {} }
			}))
		},
		setResultShow: (isResultShow: boolean) => {
			update((prev) => ({
				...prev,
				isResultShow
			}))
		}
	}
}
export const gachaStore = createGachaStore()
