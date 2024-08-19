import type { StatType, StatTypeOption } from '$entities/seals'

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

export const STATS_PERCENT_TYPE: StatType[] = ['CT', 'BL', 'EV']

export const STAT_TYPE_OPTIONS: StatTypeOption[] = ['ALL', ...STAT_TYPES]
