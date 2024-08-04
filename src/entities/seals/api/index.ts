import type { SealData, SealPrice } from '$entities/seals/type'
import { apiFetch } from '$shared/api'

export const getSeals = () => apiFetch<SealData[]>('/seals')

export const getSealPrices = (sortBy?: 'regCount' | 'modifiedAt') =>
	apiFetch<SealPrice[]>(`/seals/price${sortBy ? `?sortBy=${sortBy}` : ''}`)
