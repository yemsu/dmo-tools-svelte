import type { SEAL_MASTER_COUNT_TYPE } from '$widgets/seal-calculator/config'
import { SEAL_PERCENT_BY_STEPS } from '../config'

export type SealCount = number | null

export type SealMaterCount = (typeof SEAL_MASTER_COUNT_TYPE)[number]

export type SealStepsByMaster = Record<
	SealMaterCount,
	[SealCount, SealCount, SealCount, SealCount, SealCount, SealCount]
>

export type SealStep = {
	percent: (typeof SEAL_PERCENT_BY_STEPS)[number]
	sealCount: SealCount
}

export type SealEfficiency = {
	id: number
	count: number
	price: number
	efficiency: number
	needCount: number
	needPrice: number
	willGetStat: number
	step: SealStep
}