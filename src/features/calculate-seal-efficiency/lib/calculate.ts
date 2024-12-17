import {
	STATS,
	STATS_PERCENT_TYPE,
	type MySealCount,
	type SealData,
	type Stats,
	type StatType
} from '$entities/seals'
import {
	SEAL_COUNT_STEPS_BY_MASTER,
	SEAL_EXCEPTION_PERCENT,
	SEAL_GRADES,
	SEAL_PERCENT_STEPS
} from '$features/calculate-seal-efficiency'
import { getMySealData } from '$features/update-my-seal'
import { _objKeys, objectBy } from '$shared/lib'
import type {
	CalcTotalData,
	SealEfficiency,
	SealMaterCount,
	SealStep
} from '../types'

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

const sumMyStatBySealCount = (
	seals: SealData[],
	statType: StatType,
	mySealCounts: MySealCount[]
) => {
	if (mySealCounts.length === 0) return
	const mySealsByStatType = objectBy(
		mySealCounts,
		({ id }) => getMySealData(seals, id).statType
	)
	const sealsByStatType = mySealsByStatType[statType]
	if (!sealsByStatType || sealsByStatType.length === 0) {
		return 0
	}
	let myStat = 0
	sealsByStatType.forEach(({ id, count }) => {
		const seal = getMySealData(seals, id)
		const crrStat = getCurrentStep(seal, count)
		const maxIncrease = seal.maxIncrease
		myStat += maxIncrease * (crrStat.percent / 100)
	})
	if (STATS_PERCENT_TYPE.includes(statType)) {
		myStat = myStat / 100
	}
	return myStat
}

export const getMyAllStats = (
	seals: SealData[],
	mySealCounts: MySealCount[]
) => {
	const newStats = STATS.reduce((result, { type }) => {
		const statTypeCalc =
			mySealCounts.length === 0
				? 0
				: sumMyStatBySealCount(seals, type, mySealCounts)
		if (statTypeCalc === undefined) return result
		result[type] = statTypeCalc
		return result
	}, {} as Stats)
	return newStats
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

export const getEffDataListSorted = (
	seals: SealData[],
	statTypeSelected: StatType,
	getAllStepEffData: (seal: SealData) => SealEfficiency[]
) => {
	// 효율 리스트 뽑기
	const allSealsEffData: SealEfficiency[] = []
	const statSeals = seals.filter(
		({ statType }) => statType === statTypeSelected
	)
	for (const seal of statSeals) {
		// 각 씰의 다음 단계들의(내 보유 개수에 따라) 효율 데이터 계산하여 반환
		const calcDataStep2 = getAllStepEffData(seal)
		// 효율 데이터 리스트업
		if (calcDataStep2.length === 0) continue
		allSealsEffData.push(...calcDataStep2)
	}
	// 효율별로 소팅
	const effDataListSorted = sortByEffDataList(allSealsEffData)
	return effDataListSorted
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
		result.push({
			...effDataListSealId[effDataListSealId.length - 1],
			...totalNeedCount
		})
	}
	return sortByEffDataList(result)
}

export const getEffListForNeedStat = (
	effListSorted: SealEfficiency[],
	needStatCount: number
): SealEfficiency[] => {
	const effListForNeedStat: SealEfficiency[] = []
	let willGetStatTotal = 0

	for (const effData of effListSorted) {
		if (willGetStatTotal >= needStatCount) break

		effListForNeedStat.push(effData)
		willGetStatTotal += effData.willGetStat
	}

	return effListForNeedStat
}

export const getCalcResultTotal = (
	resultList: SealEfficiency[],
	percentNum: number
): CalcTotalData => {
	const total = resultList.reduce(
		(acc, curr) => {
			return {
				willNeedMoney: acc.willNeedMoney + curr.needPrice,
				willGetStat: acc.willGetStat + curr.willGetStat / percentNum,
				efficiency: acc.efficiency + curr.efficiency
			}
		},
		{ willNeedMoney: 0, willGetStat: 0, efficiency: 0 }
	)
	return total
}
