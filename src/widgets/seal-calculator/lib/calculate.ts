import { objectBy } from '$shared/lib'
import { SEAL_STAT_TABLE } from '$widgets/select-seal-form'
import type { SealEfficiency } from '../type'

export const getNextSteps = (sealCount: number) => {
	if (sealCount === 0) return SEAL_STAT_TABLE
	const nextSteps: (typeof SEAL_STAT_TABLE)[number][] = []
	for (const statTable of SEAL_STAT_TABLE) {
		if (sealCount < statTable.sealCount) {
			nextSteps.push(statTable)
		} else {
			continue
		}
	}
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
