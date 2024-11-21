import CalcResult from '$widgets/seal-calculator/ui/CalcResult.svelte'
import SealCalcData from '$widgets/seal-calculator/ui/SealCalcData.svelte'

export { SealCalcData, CalcResult }
export {
	SEAL_MASTER_COUNT_TYPE,
	SEAL_PERCENT_STEPS,
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_EXCEPTION_PERCENT,
	SEAL_GRADES
} from './config'
export type {
	SealStepsByMaster,
	SealMaterCount,
	SealStep,
	SealEfficiency,
	SealExceptionStep
} from './types'
export {
	getCurrentStep,
	getNextSteps,
	sortByEffDataList,
	getMySealStat
} from './lib/calculate'
