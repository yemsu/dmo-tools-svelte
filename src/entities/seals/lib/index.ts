import type { SealPrice } from '../type'

export const getSealPrice = (prices: SealPrice[], sealId: number) => {
	const result = prices.find((price) => price.sealId === sealId)
	return result
}

export const queryStringToData = <T>(
	queryString: string,
	dataKeyName: keyof T
) => {
	if (queryString?.includes('[{') || queryString?.includes('[]')) {
		return JSON.parse(queryString)
	} else {
		const decodedData = atob(queryString)
		if (decodedData?.includes('[')) {
			const parsedData = JSON.parse(decodedData)
			const mapToOBj = Array.from(parsedData, ([id, value]) => ({
				id,
				[dataKeyName]: isNaN(value * 1) ? value : value * 1
			}))
			return mapToOBj
		} else {
			return JSON.parse(decodedData)
		}
	}
}

export const updateOrAddData = <T extends { [key: string]: number }>(
	prev: T[],
	newData: T,
	compareKeyName: string = 'id'
) => {
	const prevItem = prev.find(
		(prevItem) => prevItem[compareKeyName] === newData[compareKeyName]
	)
	let result = []
	if (prevItem) {
		result = prev.map((prevItem) =>
			prevItem[compareKeyName] === newData[compareKeyName] ? newData : prevItem
		)
	} else {
		result = [...prev, newData]
	}
	return result
}
