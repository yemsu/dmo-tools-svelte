import type { RaidData, RaidTimeData } from '$entities/raid/types'
import { timeSortByVote } from '$widgets/raid'
import { writable } from 'svelte/store'

const createRaidsStore = () => {
	const { subscribe, set, update } = writable<RaidData[]>([])
	return {
		subscribe,
		set: (raids: RaidData[]) => {
			const raidsTimeSorted = raids.map((raid) => {
				raid.times = timeSortByVote(raid.times)
				return raid
			})
			set(raidsTimeSorted)
		},
		addNewTime: (time: RaidTimeData) => {
			update((prev) => {
				return prev.map((prevRaidData) => {
					const newTimes = [...prevRaidData.times, time]
					return prevRaidData.id === time.raidId
						? { ...prevRaidData, times: timeSortByVote(newTimes) }
						: prevRaidData
				})
			})
		},
		voteTime: (time: RaidTimeData) => {
			update((prev) => {
				return prev.map((prevRaidData) => {
					if (prevRaidData.id !== time.raidId) return prevRaidData
					const newTimes = prevRaidData.times.map((prevTime) =>
						prevTime.id === time.id
							? { ...prevTime, voteCount: time.voteCount }
							: prevTime
					)
					return {
						...prevRaidData,
						times: timeSortByVote(newTimes)
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
									(prevTime) => prevTime.channel !== time.channel
								)
							}
						: prevRaidData
				)
			})
		}
	}
}

export const raids = createRaidsStore()
