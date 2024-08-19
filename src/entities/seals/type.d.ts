import type { StatType } from '$widgets/my-seals/config'
import type { SealMaterCount } from '$widgets/seal-calculator'

export type SealData = {
	id: number
	name: string
	maxIncrease: number
	statType: StatType
	buyable: boolean
	masterCount: SealMaterCount
}

export type MySeal = {
	id: SealData['id']
	count: number
}

export type SealPrice = {
	id: number
	price: number
	regCount: number
	sealId: SealData['id']
	createAt: string
	modifiedAt: string
}

export type MyPrice = {
	id: SealData['id']
	price: number
}

export type Stats = Record<StatType, number>

export type StatType = (typeof STATS)[number]['type']

export type Seal = {
	name: string
	stat: StatType
	maxValue: number
}

export type StatTypeOption = StatType | 'ALL'
