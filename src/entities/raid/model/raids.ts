import type { RaidData, RaidTimeData } from '$entities/raid/types'
import { timeSortByVote } from '$widgets/raid'
import { writable } from 'svelte/store'

const raidTimeString = (raid: RaidData) => {
	return raid.times[0]
		? new Date(raid.times[0].startAt).getTime()
		: 9999999999999
}
const raidSortByTime = (raids: RaidData[]) =>
	raids.sort((a, b) => {
		const aTime = raidTimeString(a)
		const bTime = raidTimeString(b)
		return aTime - bTime
	})

const createRaidsStore = () => {
	const { subscribe, set, update } = writable<RaidData[]>([])
	return {
		subscribe,
		set: (raids: RaidData[]) => {
			const raidsTimeSorted = raids.map((raid) => {
				raid.times = timeSortByVote(raid.times)
				return raid
			})
			const raidSorted = raidSortByTime(raidsTimeSorted)
			set(raidSorted)
		},
		addNewTime: (time: RaidTimeData) => {
			update((prev) => {
				const newRaids = prev.map((prevRaidData) => {
					const newTimes = [...prevRaidData.times, time]
					return prevRaidData.id === time.raidId
						? { ...prevRaidData, times: timeSortByVote(newTimes) }
						: prevRaidData
				})
				return raidSortByTime(newRaids)
			})
		},
		voteTime: (time: RaidTimeData) => {
			update((prev) => {
				const newRaids = prev.map((prevRaidData) => {
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
				return raidSortByTime(newRaids)
			})
		},
		removeTime: (time: RaidTimeData) => {
			update((prev) => {
				const newRaids = prev.map((prevRaidData) =>
					prevRaidData.id === time.raidId
						? {
								...prevRaidData,
								times: prevRaidData.times.filter(
									(prevTime) => prevTime.channel !== time.channel
								)
							}
						: prevRaidData
				)
				return raidSortByTime(newRaids)
			})
		}
	}
}

export const raids = createRaidsStore()
