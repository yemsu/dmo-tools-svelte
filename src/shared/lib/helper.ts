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
