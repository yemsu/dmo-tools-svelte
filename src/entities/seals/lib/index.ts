import { goto } from '$app/navigation'
import type { SealPrice } from '../type/type'

export const getSealPrice = (prices: SealPrice[], sealId: number) => {
	const result = prices.find((price) => price.sealId === sealId)
	return result
}

export const createLoadSaveFn = <
	T extends { id: number; [key: string]: string | number }
>(
	storageName: string,
	dataKeyName: keyof T
) => {
	return {
		load: () => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(storageName)
			if (!savedData) return
			if (savedData?.includes('[{')) {
				return JSON.parse(savedData)
			} else {
				const decodedData = atob(savedData)
				if (decodedData?.includes('[[')) {
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
		},
		save: (data: T[]) => {
			const params = new URLSearchParams(window.location.search)
			// object > map
			const map = data.reduce((result, item: T) => {
				result.set(item.id, item[dataKeyName])
				return result
			}, new Map<number, string | number>())
			// encoding
			const dataEncoded = btoa(JSON.stringify([...map]))
			params.set(storageName, dataEncoded)
			goto(`?${params.toString()}`)
		}
	}
}

export const updateOrAddData = <T extends { id: number }>(
	prev: T[],
	newData: T
) => {
	const prevItem = prev.find((prevItem) => prevItem.id === newData.id)
	let result = []
	if (prevItem) {
		result = prev.map((prevItem) =>
			prevItem.id === newData.id ? newData : prevItem
		)
	} else {
		result = [...prev, newData]
	}
	return result
}
