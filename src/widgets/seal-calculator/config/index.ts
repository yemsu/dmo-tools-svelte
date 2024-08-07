import type { SealStepsByMaster } from '../types'

export const SEAL_MASTER_COUNT_TYPE = [
	50, 150, 200, 300, 400, 500, 700, 1000, 3000
] as const
export const SEAL_PERCENT_BY_STEPS = [10, 20, 40, 60, 80, 100] as const

export const SEAL_COUNT_STEPS_BY_MASTER: SealStepsByMaster = {
	3000: [1, 50, 200, 500, 1000, 3000],
	1000: [null, null, null, null, null, null],
	700: [1, 30, 150, 300, 500, 700],
	500: [1, 30, 100, 200, 350, 500],
	400: [1, 30, null, null, null, 400],
	300: [1, 30, 100, 150, 200, 300],
	200: [1, 50, null, null, null, 200],
	150: [1, 10, 30, 50, 100, 150],
	50: [1, 5, 10, 20, 30, 50]
}
