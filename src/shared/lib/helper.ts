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
	return (numberCut * 1).toLocaleString()
}
