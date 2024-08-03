export const commonStatTable = [
	{
		sealCount: 1,
		percent: 10
	},
	{
		sealCount: 50,
		percent: 20
	},
	{
		sealCount: 200,
		percent: 40
	},
	{
		sealCount: 500,
		percent: 60
	},
	{
		sealCount: 1000,
		percent: 80
	},
	{
		sealCount: 3000,
		percent: 100
	}
]

export const STATS = [
	{ type: 'AT', name: '공격력' },
	{ type: 'HT', name: '적중도' },
	{ type: 'CT', name: '치명타' }
] as const

export type StatType = (typeof STATS)[number]['type']

export type Seal = {
	name: string
	stat: StatType
	maxValue: number
}

export const seals: Seal[] = [
	{
		name: '아구몬',
		stat: 'AT',
		maxValue: 300
	},
	{
		name: '파피몬',
		stat: 'HT',
		maxValue: 200
	},
	{
		name: '오메가몬',
		stat: 'CT',
		maxValue: 100
	}
]
