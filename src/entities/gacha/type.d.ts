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
	ticketCost: number
	maxDrawCount: number
	gachaItems: GachaResultData[]
}

export type InventoryItem = {
	item: GachaItemData
	count: number
}
