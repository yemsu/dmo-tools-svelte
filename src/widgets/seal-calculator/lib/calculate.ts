import type { SealData } from '$entities/seals'
import { objectBy } from '$shared/lib'
import {
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_PERCENT_BY_STEPS
} from '$widgets/seal-calculator/config'
import { SEAL_STAT_TABLE } from '$widgets/select-seal-form'
import type { SealEfficiency, SealStep } from '../types'

export const getNextSteps = (seal: SealData, sealCount: number): SealStep[] => {
	const { masterCount } = seal
	const sealCountSteps = SEAL_COUNT_STEPS_BY_MASTER[masterCount]
	if (!sealCountSteps) {
		console.error(
			`${seal.name}: "${masterCount}": 잘못된 masterCount를 가지고 있는 씰이 존재합니다. 확인해주세요.`
		)
		return [{ percent: 10, sealCount: null }]
		throw Error(
			`${seal.name}: "${masterCount}": 잘못된 masterCount를 가지고 있는 씰이 존재합니다. 확인해주세요.`
		)
	}
	const nextSteps: SealStep[] = []
	sealCountSteps.forEach((sealCountStep, i) => {
		if (sealCountStep === null || sealCount >= sealCountStep) return
		nextSteps.push({
			percent: SEAL_PERCENT_BY_STEPS[i],
			sealCount: sealCountStep
		})
	})
	return nextSteps
}

export const getPrevStep = (crrStepSealCount: number) => {
	let step: (typeof SEAL_STAT_TABLE)[number] | undefined
	for (const statTable of SEAL_STAT_TABLE) {
		if (crrStepSealCount > statTable.sealCount) {
			step = statTable
		} else {
			break
		}
	}
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
