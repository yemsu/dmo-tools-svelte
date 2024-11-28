import type { RaidData } from '$entities/raid'
import { writable } from 'svelte/store'

export const RAID_ITEM_ALARM_STORAGE = 'RAID_ITEM_ALARM_STORAGE'
export const RAID_ITEM_FAVORITE_STORAGE = 'RAID_ITEM_FAVORITE_STORAGE'

type RaidIdList = string[]

export type RaidOptionStore = {
	noAlarmRaidIds: RaidIdList | undefined
	favoriteRaidIds: RaidIdList | undefined
}

const parseData = (storageName: string) => {
	return JSON.parse(localStorage.getItem(storageName) || '[]') as RaidIdList
}

const getToggledData = (dataName: keyof RaidOptionStore, raidId: number) => {
	return (prev: RaidOptionStore) => {
		const hasId = prev[dataName]?.some((strRaidId) => +strRaidId === raidId)
		if (hasId) {
			return {
				...prev,
				[dataName]: prev[dataName]?.filter((strRaidId) => +strRaidId !== raidId)
			}
		} else {
			return {
				...prev,
				[dataName]: [...(prev[dataName] || []), `${raidId}`]
			}
		}
	}
}

const createRaidOptionStore = () => {
	const { subscribe, update } = writable<RaidOptionStore>({
		noAlarmRaidIds: undefined,
		favoriteRaidIds: undefined
	})

	return {
		subscribe,
		loadAllOptions: () => {
			const savedAlarmOptions = parseData(RAID_ITEM_ALARM_STORAGE)
			const savedFavoriteOptions = parseData(RAID_ITEM_FAVORITE_STORAGE)
			update((prev) => ({
				...prev,
				noAlarmRaidIds: savedAlarmOptions,
				favoriteRaidIds: savedFavoriteOptions
			}))
		},
		toggleAlarmOption: (raidId: RaidData['id']) => {
			update(getToggledData('noAlarmRaidIds', raidId))
			subscribe(($raidOptionStore) => {
				localStorage.setItem(
					RAID_ITEM_ALARM_STORAGE,
					JSON.stringify($raidOptionStore.noAlarmRaidIds)
				)
			})
		},
		toggleFavoriteOption: (raidId: RaidData['id']) => {
			update(getToggledData('favoriteRaidIds', raidId))
			subscribe(($raidOptionStore) => {
				localStorage.setItem(
					RAID_ITEM_FAVORITE_STORAGE,
					JSON.stringify($raidOptionStore.favoriteRaidIds)
				)
			})
		}
	}
}

export const raidOption = createRaidOptionStore()
