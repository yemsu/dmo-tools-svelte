import type { SealData, SealPrice } from '$entities/seals/type'
import { apiFetch } from '$shared/api'

export const getSeals = () => apiFetch<SealData[]>('/seals')

export const getSealPrices = (sortBy: 'regCount' | 'modifiedAt' = 'regCount') =>
	apiFetch<SealPrice[]>(`/seals/price${sortBy ? `?sortBy=${sortBy}` : ''}`)

export const postSealPrice = (sealId: number, price: number) =>
	apiFetch<SealPrice>(`/seals/${sealId}?price=${price}`, { method: 'POST' })
