export const objectBy = <ArrItem, KeyName extends string>(
	arr: ArrItem[],
	keyNameCB: (arrItem: ArrItem) => KeyName
) => {
	const result = arr.reduce(
		(result, arrItem) => {
			const keyName = keyNameCB(arrItem)
			if (!result[keyName]) {
				result[keyName] = []
			}
			result[keyName] = [...result[keyName], arrItem]
			return result
		},
		{} as Record<KeyName, ArrItem[]>
	)
	return result
}

export const cn = (
	...classNames: (string | number | undefined | boolean | null)[]
) => {
	return classNames.filter((className) => className).join(' ')
}

export const numberFormatter = (number: number, fractionDigits: number = 2) => {
	const numberCut = +number.toFixed(fractionDigits)
	return numberCut > 100 ? numberCut.toLocaleString() : numberCut * 1
}

export const timeElapsedString = (createdAt: string) => {
	const createdTime = new Date(createdAt)
	const currentTime = new Date()
	const elapsedMilliseconds = currentTime.getTime() - createdTime.getTime()
	const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
	const elapsedMinutes = Math.floor(elapsedSeconds / 60)
	const elapsedHours = Math.floor(elapsedMinutes / 60)
	const elapsedDays = Math.floor(elapsedHours / 24)
	const elapsedMonths = Math.floor(elapsedDays / 30)
	const elapsedYears = Math.floor(elapsedDays / 365)

	if (elapsedYears > 0) {
		return `${elapsedYears}년 전`
	} else if (elapsedMonths > 0) {
		return `${elapsedMonths}달 전`
	} else if (elapsedDays > 0) {
		return `${elapsedDays}일 전`
	} else if (elapsedHours > 0) {
		return `${elapsedHours}시간 전`
	} else if (elapsedMinutes > 0) {
		return `${elapsedMinutes}분 전`
	} else {
		return '방금 전'
	}
}
