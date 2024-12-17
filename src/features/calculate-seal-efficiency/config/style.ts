import type { StatType, StatTypeOption } from '$entities/seals'

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

export const statTypeOptionStyles: Record<StatTypeOption, string> = {
	ALL: 'text-gray-12',
	...statColorStyles
}
