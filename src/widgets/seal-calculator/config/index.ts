import type { SealExceptionStep, SealStepsByMaster } from '../types'

export const SEAL_MASTER_COUNT_TYPE = [
	50, 150, 200, 300, 400, 500, 700, 1000, 3000
] as const

export const SEAL_PERCENT_STEPS = [10, 20, 40, 60, 80, 100] as const

export const SEAL_GRADES = [
	{ name: '노말', engName: 'Normal' },
	{ name: '브론즈', engName: 'Bronze' },
	{ name: '실버', engName: 'Silver' },
	{ name: '골드', engName: 'Gold' },
	{ name: '플래티넘', engName: 'Platinum' },
	{ name: '마스터', engName: 'Master' }
] as const

export const SEAL_COUNT_STEPS_BY_MASTER: SealStepsByMaster = {
	'3000': [1, 50, 200, 500, 1000, 3000],
	'1000': [1, 50, 200, 500, 700, 1000],
	'700': [1, 30, 150, 300, 500, 700],
	'500': [1, 30, 100, 200, 350, 500],
	'400': [1, 30, 100, 150, 250, 400],
	'300': [1, 30, 100, 150, 200, 300],
	'200': [1, 50, 100, 150, 180, 200],
	'150': [1, 10, 30, 50, 100, 150],
	'50': [1, 3, 10, 20, 30, 50]
}

export const SEAL_EXCEPTION_PERCENT: SealExceptionStep = {
	'220': [
		11.1111,
		22.2222,
		26.6666,
		SEAL_PERCENT_STEPS[3],
		SEAL_PERCENT_STEPS[4],
		SEAL_PERCENT_STEPS[5]
	],
	'221': [
		SEAL_PERCENT_STEPS[0],
		SEAL_PERCENT_STEPS[1],
		25,
		SEAL_PERCENT_STEPS[3],
		SEAL_PERCENT_STEPS[4],
		SEAL_PERCENT_STEPS[5]
	]
}
