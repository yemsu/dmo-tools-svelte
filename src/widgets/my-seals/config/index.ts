export const STATS = [
	{ type: 'AT', name: '공격력' },
	{ type: 'CT', name: '치명타' },
	{ type: 'HT', name: '적중도' },
	{ type: 'HP', name: '체력' },
	{ type: 'DS', name: '디지소울' },
	{ type: 'DE', name: '방어력 ' },
	{ type: 'BL', name: '블럭율' },
	{ type: 'EV', name: '회피율' }
] as const

export const STAT_TYPES = STATS.map(({ type }) => type)

export type StatType = (typeof STATS)[number]['type']

export type Seal = {
	name: string
	stat: StatType
	maxValue: number
}

export const statColorStyles: Record<StatType, string> = {
	AT: 'text-stat-at',
	HT: 'text-stat-ht',
	CT: 'text-stat-ct',
	HP: 'text-stat-hp',
	DS: 'text-stat-ds',
	DE: 'text-stat-de',
	BL: 'text-stat-bl',
	EV: 'text-stat-ev'
}

export const STAT_TYPE_OPTIONS: StatTypeOption[] = ['ALL', ...STAT_TYPES]
export type StatTypeOption = StatType | 'ALL'
export const statTypeOptionStyles: Record<StatTypeOption, string> = {
	ALL: 'text-white',
	...statColorStyles
}
