import type { StatType } from '$widgets/select-seal-form/config'

export type SealData = {
	id: number
	name: string
	maxIncrease: number
	statType: StatType
}

export type MySeal = {
	sealId: number
	count: number
}

export type SealPrice = {
	id: number
	price: number
	regCount: number
	sealId: number
	createAt: string
	modifiedAt: string
}

export type MyStats = Record<StatType, number>
