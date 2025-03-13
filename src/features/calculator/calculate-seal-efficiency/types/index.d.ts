import type {
	SEAL_GRADES,
	SEAL_MASTER_COUNT_TYPE
} from '$features/calculator/calculate-seal-efficiency'

export type SealMaterCount = (typeof SEAL_MASTER_COUNT_TYPE)[number]

export type SealStepValues = [number, number, number, number, number, number]

export type SealStepsByMaster = Record<`${SealMaterCount}`, SealStepValues>

export type SealStep = {
	percent: number
	sealCount: number
	grade?: (typeof SEAL_GRADES)[number]
}

export type SealEfficiency = {
	id: number
	count: number
	price: number
	efficiency: number
	needCount: number
	needPrice: number
	willGetStat: number
	nextStepIdx: number
	myStep: SealStep | undefined
}

export type SealExceptionStep = Record<
	`${SealEfficiency['id']}`,
	SealStepValues
>
export type ViewMode = 'merged' | 'separated'
export type CalcResultList = Record<ViewMode, SealEfficiency[]>
export type CalcTotalData = {
	willGetStat: number
	willNeedMoney: number
	efficiency: number
}
