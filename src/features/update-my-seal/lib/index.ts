import type { MySealPrice, SealData, SealPrice } from '$entities/seals'

export const getMySealData = (seals: SealData[], sealId: number) => {
	const mySealData = seals.find(({ id }) => id === sealId)
	if (!mySealData) {
		throw Error(
			`ERROR mySealData : id값 ${sealId}에 해당하는 seal을 찾을 수 없습니다.`
		)
	}
	return mySealData
}

export const getMyAndFinalPrice = (
	sealPrices: SealPrice[],
	mySealPrices: MySealPrice[],
	sealId: SealData['id']
) => {
	const price =
		sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price || 0
	const my = mySealPrices.find(({ id }) => id === sealId)?.price
	const final = my === undefined ? price : my
	return { my, final }
}
