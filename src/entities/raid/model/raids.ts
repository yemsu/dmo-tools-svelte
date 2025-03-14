import type { RaidData, RaidTimeData } from '$entities/raid/types'
import type { RaidOptionStore } from '$features/raid/control-raid-timer'
import { timeSortByVote } from '$features/raid/display-raid-info'
import { writable } from 'svelte/store'

const sortRaid = (raids: RaidData[], raidOption: RaidOptionStore) => {
	const { favoriteRaidIds } = raidOption
	const sortedRaid = raids.sort((a, b) => {
		// favorite 대조
		const aIsFavorite = favoriteRaidIds?.some((strId) => +strId === a.id)
		const bIsFavorite = favoriteRaidIds?.some((strId) => +strId === b.id)
		if (aIsFavorite && !bIsFavorite) {
			return -1
		}
		if (!aIsFavorite && bIsFavorite) {
			return 1
		}
		// alarmOff 대조
		// const aIsAlarmOff = noAlarmRaidIds?.some((strId) => +strId === a.id)
		// const bIsAlarmOff = noAlarmRaidIds?.some((strId) => +strId === b.id)
		// if (aIsAlarmOff && !bIsAlarmOff) {
		// 	return 1
		// }
		// if (!aIsAlarmOff && bIsAlarmOff) {
		// 	return -1
		// }
		// startAt 대조
		const aStartAt = a.times[0]?.startAt
		const bStartAt = b.times[0]?.startAt
		if (aStartAt && bStartAt) {
			return new Date(aStartAt).getTime() - new Date(bStartAt).getTime()
		}
		if (bStartAt) {
			return 1
		}
		if (aStartAt) {
			return -1
		}
		const koreanNameCompare = a.name.localeCompare(b.name, 'ko-KR')
		return koreanNameCompare
	})
	return sortedRaid
}

const createRaidsStore = () => {
	const { subscribe, set, update } = writable<RaidData[]>([])
	return {
		subscribe,
		set: (raids: RaidData[], raidOption: RaidOptionStore) => {
			const raidsTimeSorted = raids.map((raid) => {
				raid.times = timeSortByVote(raid.times)
				return raid
			})
			const raidSorted = sortRaid(raidsTimeSorted, raidOption)
			set(raidSorted)
		},
		addNewTime: (time: RaidTimeData, raidOption: RaidOptionStore) => {
			update((prev) => {
				const newRaids = prev.map((prevRaidData) => {
					const newTimes = [...prevRaidData.times, time]
					return prevRaidData.id === time.raidId
						? { ...prevRaidData, times: timeSortByVote(newTimes) }
						: prevRaidData
				})
				return sortRaid(newRaids, raidOption)
			})
		},
		voteTime: (time: RaidTimeData, raidOption: RaidOptionStore) => {
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
				return sortRaid(newRaids, raidOption)
			})
		},
		removeTime: (time: RaidTimeData, raidOption: RaidOptionStore) => {
			update((prev) => {
				const newRaids = prev.map((prevRaidData) =>
					prevRaidData.id === time.raidId
						? {
								...prevRaidData,
								times: prevRaidData.times.filter(
									(prevTime) => prevTime.id !== time.id
								)
							}
						: prevRaidData
				)
				return sortRaid(newRaids, raidOption)
			})
		},
		removeChannelTimes: (time: RaidTimeData, raidOption: RaidOptionStore) => {
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
				return sortRaid(newRaids, raidOption)
			})
		}
	}
}

export const raids = createRaidsStore()
