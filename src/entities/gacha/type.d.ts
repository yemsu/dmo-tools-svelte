import type { GACHA_TYPES } from '$entities/gacha/config'

export type GachaItemData = {
	id: number
	name: string
}

export type GachaResultData = {
	id: number
	probability: number
	rarity: number
	item: GachaItemData
}

export type GachaDataType = keyof typeof GACHA_TYPES

export type GachaData = {
	id: number
	name: string
	category: string
	ticketCost: number
	maxDrawCount: number
	gachaItems: GachaResultData[]
	type: GachaDataType
}

export type InventoryItem = {
	item: GachaItemData
	count: number
}

export type GachaTabContents = Record<
	GachaDataType,
	{ title: string; gachaList: GachaData[] }
>
