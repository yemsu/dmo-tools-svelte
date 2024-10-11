import type { StatType, StatTypeOption } from '$entities/seals'

export const STATS = [
	{ type: 'AT', name: '공격력', engName: 'Attack Power' },
	{ type: 'CT', name: '치명타', engName: 'Critical' },
	{ type: 'HT', name: '적중도', engName: 'Hit Rate' },
	{ type: 'HP', name: '체력', engName: 'HP' },
	{ type: 'DS', name: '디지소울', engName: 'Digi Soul' },
	{ type: 'DE', name: '방어력 ', engName: 'Defense' },
	{ type: 'BL', name: '블럭율', engName: 'Block Rate' },
	{ type: 'EV', name: '회피율', engName: 'Evasion Rate' }
] as const

export const STAT_TYPES: StatType[] = STATS.map(({ type }) => type)

export const STATS_PERCENT_TYPE: StatType[] = ['CT', 'BL', 'EV']

export const STAT_TYPE_OPTIONS: StatTypeOption[] = ['ALL', ...STAT_TYPES]
