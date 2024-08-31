import type { GachaData } from '$entities/gacha/type'
import { apiFetch } from '$shared/api'

export const getGachaList = () => apiFetch<GachaData[]>(`/gatcha`)
