import type { RaidTimeData } from '$entities/raid'

export const timeSortByVote = (times: RaidTimeData[]) =>
	times.sort((a, b) => b.voteCount - a.voteCount)

export const timeSortByStartAt = (times: RaidTimeData[]) =>
	times.sort((a, b) => {
		const dateA = new Date(a.startAt)
		const dateB = new Date(b.startAt)
		return dateA.getTime() - dateB.getTime()
	})
