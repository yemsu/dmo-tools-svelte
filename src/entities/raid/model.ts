import type { RaidData, RaidTimeData, ServerType } from '$entities/raid/types'
import { writable } from 'svelte/store'

export const crrServerType = writable<ServerType | undefined>()
export const selectedRaidId = writable<RaidData['id']>()

export const subscribeClientId = writable<string | undefined>()

const createRaidsStore = () => {
	const { subscribe, set, update } = writable<RaidData[]>([])
	return {
		subscribe,
		set: (raids: RaidData[]) => {
			set(raids)
		},
		addNewTime: (time: RaidTimeData) => {
			update((prev) => {
				return prev.map((prevRaidData) =>
					prevRaidData.id === time.raidId
						? { ...prevRaidData, times: [...prevRaidData.times, time] }
						: prevRaidData
				)
			})
		},
		voteTime: (time: RaidTimeData) => {
			update((prev) => {
				return prev.map((prevRaidData) => {
					if (prevRaidData.id !== time.raidId) return prevRaidData
					const voteCountUpdatedTimes = prevRaidData.times.map((prevTime) =>
						prevTime.id === time.id
							? { ...prevTime, voteCount: time.voteCount }
							: prevTime
					)
					return {
						...prevRaidData,
						times: voteCountUpdatedTimes
					}
				})
			})
		},
		removeTime: (time: RaidTimeData) => {
			update((prev) => {
				return prev.map((prevRaidData) =>
					prevRaidData.id === time.raidId
						? {
								...prevRaidData,
								times: prevRaidData.times.filter(
									(prevTime) => prevTime.id !== time.id
								)
							}
						: prevRaidData
				)
			})
		}
	}
}

export const raids = createRaidsStore()
