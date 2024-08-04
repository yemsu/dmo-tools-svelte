import type { StatType } from '$widgets/select-seal-form/config'

export type SealData = {
	id: number
	name: string
	maxIncrease: number
	statType: StatType
}

export type MySeal = SealData & {
	count: number
}
