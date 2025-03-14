import type { RaidTimeData } from '$entities/raid'

const compareDate = (a: RaidTimeData, b: RaidTimeData) => {
	const dateA = new Date(a.startAt)
	const dateB = new Date(b.startAt)
	return dateA.getTime() - dateB.getTime()
}

export const timeSortByStartAt = (times: RaidTimeData[]) =>
	times.sort((a, b) => compareDate(a, b))

export const timeSortByVote = (times: RaidTimeData[]) =>
	times.sort((a, b) => {
		if (b.voteCount === a.voteCount) {
			return compareDate(a, b)
		}
		return b.voteCount - a.voteCount
	})
