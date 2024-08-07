import type { MENUS } from '$entities/seals'
import type { StatType } from '$widgets/select-seal-form/config'

export type SealData = {
	id: number
	name: string
	maxIncrease: number
	statType: StatType
}

export type MySeal = {
	id: number
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

export type Stats = Record<StatType, number>

export type Menus = (typeof MENUS)[number]
