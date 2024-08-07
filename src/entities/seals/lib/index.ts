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
