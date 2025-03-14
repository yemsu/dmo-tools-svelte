import type { CharacterData } from '$entities/characters'
import type {
	MySealCount,
	MySealPrice,
	SealData,
	SealPrice,
	SealPriceHistory
} from '$entities/seals/type'
import { apiFetch } from '$shared/api'
import type { LangType } from '$shared/types'

export const getSeals = () => apiFetch<SealData[]>('/seals')

export const getSealPrices = (
	sortBy: 'regCount' | 'modifiedAt' = 'regCount',
	lang: LangType
) => {
	const langParam = lang === 'en' ? '&server=sOmega' : ''
	return apiFetch<SealPrice[]>(`/seals/price${`?sortBy=${sortBy}${langParam}`}`)
}

export const getSealPricesHistory = () => {
	return apiFetch<SealPriceHistory[]>('/seals/price/history')
}

// seal count
export const getMySealsCount = (characterId: CharacterData['id']) =>
	apiFetch<MySealCount[]>(`/seals/my/${characterId}/count`)

export const putMySealCount = (
	characterId: CharacterData['id'],
	{ id, count }: MySealCount
) => {
	return apiFetch<MySealCount>(`/seals/my/${characterId}/${id}/count`, {
		method: 'PUT',
		body: JSON.stringify({ count })
	})
}

// seal price
export const getMySealsPrice = () => apiFetch<MySealPrice[]>(`/seals/my/price`)

export const putMySealPrice = ({ id, price }: MySealPrice) => {
	return apiFetch<MySealPrice>(`/seals/my/${id}/price`, {
		method: 'PUT',
		body: JSON.stringify({ price })
	})
}
