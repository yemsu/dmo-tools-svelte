import type { SealData } from '$entities/seals'
import { _objKeys, objectBy } from '$shared/lib'
import {
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_EXCEPTION_PERCENT,
	SEAL_GRADES,
	SEAL_PERCENT_STEPS
} from '$widgets/seal-calculator/config'
import type { SealEfficiency, SealStep } from '../types'

export const getSealPercentConfig = (sealId: number, stepIndex: number) => {
	const exceptionSealIds = _objKeys(SEAL_EXCEPTION_PERCENT)
	return exceptionSealIds.includes(`${sealId}`)
		? SEAL_EXCEPTION_PERCENT[`${sealId}`][stepIndex]
		: SEAL_PERCENT_STEPS[stepIndex]
}

export const getMySealStat = (seal: SealData, stepPercent: number) => {
	return Math.round(seal.maxIncrease * (stepPercent / 100))
}

export const getNextSteps = (seal: SealData, sealCount: number): SealStep[] => {
	const { masterCount } = seal
	const sealCountSteps = SEAL_COUNT_STEPS_BY_MASTER[`${masterCount}`]
	if (!sealCountSteps) {
		console.error(
			`${seal.name}: "${masterCount}": 잘못된 masterCount를 가지고 있는 씰이 존재합니다. 확인해주세요.`
		)
		return [{ percent: 10, sealCount: 0 }]
	}
	const nextSteps: SealStep[] = []
	sealCountSteps.forEach((sealCountStep, i) => {
		if (sealCountStep === null || sealCount >= sealCountStep) return
		nextSteps.push({
			percent: getSealPercentConfig(seal.id, i),
			sealCount: sealCountStep
		})
	})
	return nextSteps
}

export const getCurrentStep = (seal: SealData, crrStepSealCount: number) => {
	const { masterCount } = seal
	const sealCountSteps = SEAL_COUNT_STEPS_BY_MASTER[`${masterCount}`]
	let step: SealStep | undefined
	sealCountSteps.forEach((sealCountStep, i) => {
		if (crrStepSealCount < sealCountStep) return
		step = {
			percent: getSealPercentConfig(seal.id, i),
			sealCount: sealCountStep,
			grade: SEAL_GRADES[i]
		}
	})
	if (!step) {
		throw Error(
			`ERROR getCurrentStep : ${seal.id}-${seal.name}-${seal.maxIncrease}에 해당하는 step을 찾을 수 없습니다.`
		)
	}
	return step
}

export const getPrevStep = (seal: SealData, crrStepSealCount: number) => {
	const { masterCount } = seal
	const sealCountSteps = SEAL_COUNT_STEPS_BY_MASTER[`${masterCount}`]
	let step: SealStep | undefined
	sealCountSteps.forEach((sealCountStep, i) => {
		if (crrStepSealCount <= sealCountStep) return
		step = {
			percent: getSealPercentConfig(seal.id, i),
			sealCount: sealCountStep
		}
	})
	return step
}

export const sortByEffDataList = (effDataList: SealEfficiency[]) => {
	return effDataList.sort((a, b) => {
		const aEff = a.efficiency
		const bEff = b.efficiency
		return bEff - aEff
	})
}

export const resultMerged = (effDataList: SealEfficiency[]) => {
	const result: SealEfficiency[] = []
	const effDataListBySealId = objectBy(effDataList, (data) => data.id + '')
	for (const sealId in effDataListBySealId) {
		const effDataListSealId = effDataListBySealId[sealId]
		const totalNeedCount = {
			needCount: 0,
			needPrice: 0,
			willGetStat: 0,
			efficiency: 0
		}
		effDataListSealId.forEach((effDataSealId, i) => {
			totalNeedCount.needCount += effDataSealId.needCount
			totalNeedCount.needPrice += effDataSealId.needPrice
			totalNeedCount.willGetStat += effDataSealId.willGetStat
			totalNeedCount.efficiency =
				(totalNeedCount.efficiency + effDataSealId.efficiency) / (i + 1)
		})
		result.push({ ...effDataListSealId[0], ...totalNeedCount })
	}
	return sortByEffDataList(result)
}
