import type { STATS } from '$entities/seals/config'
import type { SealMaterCount } from '$features/calculator/calculate-seal-efficiency'

export type StatType = (typeof STATS)[number]['type']

export type SealData = {
	id: number
	name: string
	engName: string
	maxIncrease: number
	statType: StatType
	buyable: boolean
	masterCount: SealMaterCount
}

export type MySeal = {
	id: SealData['id']
	count: number
}

export type MySealCount = {
	id: SealData['id']
	count: number
}

export type MySealPrice = {
	id: SealData['id']
	price: number
}

export type SealPrice = {
	id: number
	price: number
	regCount: number
	sealId: SealData['id']
	createdAt: string
	modifiedAt: string
}

export type SealPriceHistory = {
	sealId: SealData['id']
	history: Omit<SealPrice, 'id'>[] | undefined
}

export type PriceChartData = {
	labels: string[]
	data: number[]
}

export type SealsPriceChartData = Record<SealData['id'], PriceChartData | null>

export type MyPrice = {
	id: SealData['id']
	price: number
}

export type Stats = Record<StatType, number>

export type Seal = {
	name: string
	stat: StatType
	maxValue: number
}

export type StatTypeOption = StatType | 'ALL'
