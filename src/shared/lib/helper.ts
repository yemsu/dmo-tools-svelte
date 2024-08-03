export const objectBy = <ArrItem, KeyName extends string>(
	arr: ArrItem[],
	keyNameCB: (arrItem: ArrItem) => KeyName
) => {
	const result = arr.reduce(
		(result, mySeal) => {
			const keyName = keyNameCB(mySeal)
			if (!result[keyName]) {
				result[keyName] = []
			}
			result[keyName] = [...result[keyName], mySeal]
			return result
		},
		{} as Record<KeyName, ArrItem[]>
	)
	return result
}
