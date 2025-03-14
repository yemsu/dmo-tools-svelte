import CalcTargetForm from '$features/calculator/calculate-seal-efficiency/ui/CalcTargetForm.svelte'

export { CalcTargetForm }

export {
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_EXCEPTION_PERCENT,
	SEAL_GRADES,
	SEAL_MASTER_COUNT_TYPE,
	SEAL_PERCENT_STEPS
} from './config'
export { statColorStyles, statTypeOptionStyles } from './config/style'
export {
	getCurrentStep,
	getMySealStat,
	getNextSteps,
	sortByEffDataList,
	getCalcResultTotal,
	getEffListForNeedStat,
	getMergedResult,
	getNextStepsEffData,
	getEffDataListSorted,
	getMyAllStats
} from './lib/calculate'
export { createCostResultGetter } from './lib/calculateLowPrice'
export { generateSealsPriceChart } from './lib/sealPrices'
export type {
	SealEfficiency,
	SealExceptionStep,
	SealMaterCount,
	SealStep,
	SealStepsByMaster,
	CalcResultList,
	CalcTotalData
} from './types'

export { calc } from '$features/calculator/calculate-seal-efficiency/model/calculator'
