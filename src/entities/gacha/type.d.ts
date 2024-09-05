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

export type GachaData = {
	id: number
	name: string
	category: string
	ticketCost: number
	maxDrawCount: number
	gachaItems: GachaResultData[]
	type: 'DATA_SUMMON' | 'DIGITAL_DRAW'
}

export type InventoryItem = {
	item: GachaItemData
	count: number
}
