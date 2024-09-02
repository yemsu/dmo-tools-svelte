export const _remove = <T extends { id: number }>(arr: T[], _id: number) => {
	return arr.filter(({ id }) => id !== _id)
}

export const _pick = <T extends { id: number }>(arr: T[], _id: number) => {
	const pickedItem = arr.find(({ id }) => id === _id)
	if (!pickedItem) {
		throw Error(
			`_pick Fn Error : arr에서 ${_id}를 id값으로 가진 array item을 찾을 수 없습니다. 배열 데이터와 id값을 다시 확인해주세요.`
		)
	}
	return pickedItem
}

export const _objKeys = <T extends { [key: string]: unknown }>(obj: T) => {
	const objKeys = Object.keys(obj) as (keyof typeof obj)[]
	return objKeys.map((objKey) => {
		if (typeof objKey !== 'symbol' && !isNaN(Number(objKey))) {
			return Number(objKey)
		}
		return objKey
	})
}
