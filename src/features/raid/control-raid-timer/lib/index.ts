export const getRemainingTime = (startAt: string) => {
	const bossTime = new Date(startAt).getTime()
	const currentTime = new Date().getTime()
	const timeDifference = bossTime - currentTime

	if (timeDifference <= 0) {
		return '출현 중'
	}

	const hours = Math.floor(timeDifference / (1000 * 60 * 60))
	const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
	const hourStr = hours > 0 ? `${hours}시간` : ''
	const minuteStr = minutes > 0 ? `${minutes}분` : ''

	return hours < 1 && minutes < 1 ? '곧 출현' : `${hourStr}${minuteStr} 전`
}
