import { goto } from '$app/navigation'
import type { SealPrice } from '../type'

export const getSealPrice = (prices: SealPrice[], sealId: number) => {
	const result = prices.find((price) => price.sealId === sealId)
	if (!result) {
		throw Error(
			`FAILED getSealPrice : ${sealId}에 해당하는 가격 정보를 찾을 수 없습니다. 데이터 혹은 인자가 올바른지 확인해주세요.`
		)
	}
	return result
}

export const createLoadSaveFn = <T>(storageName: string) => {
	return {
		load: () => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(storageName)
			if (!savedData) return
			const isNotEncodedData = savedData?.includes('[{')
			const data = isNotEncodedData ? savedData : atob(savedData)
			return JSON.parse(data)
		},
		save: (data: T[]) => {
			const params = new URLSearchParams(window.location.search)
			const dataEncoded = btoa(JSON.stringify(data))
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
