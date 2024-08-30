export type GachaItem = {
	id: number
	name: string
}

export type GachaResultItem = {
	id: number
	probability: number
	rarity: number
	item: GachaItem
}

export type GachaData = {
	id: number
	name: string
	ticketCost: number
	maxDrawCount: number
	gachaItems: GachaResultItem[]
}
