import type { SealData } from '$entities/seals'
import { _objKeys, objectBy } from '$shared/lib'
import {
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_EXCEPTION_PERCENT,
	SEAL_GRADES,
	SEAL_PERCENT_STEPS
} from '$widgets/seal-calculator/config'
import type { SealEfficiency, SealMaterCount, SealStep } from '../types'

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
		alert(`${seal.name}: "${masterCount}": 잘못된 masterCount입니다.`)
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

export const getNextStepsEffData = (
	seal: SealData,
	price: number,
	mySealCount: number,
	nextSteps: SealStep[]
) => {
	const crrMyStep =
		mySealCount !== 0 ? getCurrentStep(seal, mySealCount) : undefined
	const result: SealEfficiency[] = []
	if (nextSteps.length === 0) return result
	for (const nextStep of nextSteps) {
		if (nextStep.sealCount === null) continue
		const prevStep = getPrevStep(seal, nextStep.sealCount)
		const willGetStat =
			seal.maxIncrease *
			((nextStep.percent -
				Math.max(crrMyStep?.percent || 0, prevStep?.percent || 0)) /
				100)
		const needCount =
			nextStep.sealCount - Math.max(mySealCount, prevStep?.sealCount || 0)
		const needPrice = price ? needCount * price : 0
		const efficiency = +(willGetStat / needPrice) || 0
		result.push({
			id: seal.id,
			price,
			count: mySealCount,
			willGetStat: Math.round(willGetStat),
			nextStepIdx: SEAL_COUNT_STEPS_BY_MASTER[
				seal.masterCount as SealMaterCount
			].indexOf(nextStep.sealCount),
			needCount,
			needPrice,
			efficiency,
			myStep: crrMyStep
		})
	}
	return result
}

export const sortByEffDataList = (effDataList: SealEfficiency[]) => {
	return effDataList.sort((a, b) => {
		const aEff = a.efficiency
		const bEff = b.efficiency
		return bEff - aEff
	})
}

export const getMergedResult = (effDataList: SealEfficiency[]) => {
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

export const getEfficiencyFilteredList = (
	sortedEfficiencyData: SealEfficiency[],
	needStatCount: number
): SealEfficiency[] => {
	const effDataListSorted: SealEfficiency[] = []
	let willGetStatTotal = 0

	for (const effData of sortedEfficiencyData) {
		if (willGetStatTotal >= needStatCount) break

		effDataListSorted.push(effData)
		willGetStatTotal += effData.willGetStat
	}

	return effDataListSorted
}

export const calculateEfficiencyTotals = (
	filteredList: SealEfficiency[]
): {
	willNeedMoneyTotal: number
	willGetStatTotal: number
} => {
	return filteredList.reduce(
		(acc, curr) => ({
			willNeedMoneyTotal: acc.willNeedMoneyTotal + curr.needPrice,
			willGetStatTotal: acc.willGetStatTotal + curr.willGetStat
		}),
		{ willNeedMoneyTotal: 0, willGetStatTotal: 0 }
	)
}
