import type { SEAL_STAT_TABLE } from '$widgets/select-seal-form/config'

export type SealEfficiency = {
	id: number
	count: number
	price: number
	efficiency: number
	needCount: number
	needPrice: number
	willGetStat: number
	step: (typeof SEAL_STAT_TABLE)[number]
}
