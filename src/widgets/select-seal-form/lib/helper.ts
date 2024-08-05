import type { SealData } from '$entities/seals'

export const getMySealData = ($seals: SealData[], sealId: number) => {
	const mySealData = $seals.find(({ id }) => id === sealId)
	if (!mySealData) {
		throw Error(
			`ERROR mySealData : id값 ${sealId}에 해당하는 seal을 찾을 수 없습니다.`
		)
	}
	return mySealData
}
