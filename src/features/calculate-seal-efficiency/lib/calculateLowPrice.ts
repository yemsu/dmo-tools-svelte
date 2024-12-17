import { type SealData } from '$entities/seals'
import type { CalcResultList, SealEfficiency } from '../types'

type BestCase = {
	key: SealEfficiency | null
	value: SealEfficiency[]
	efficiencyLoss: number
}

const findCombinationsWithTargetStat = (
	items: SealEfficiency[],
	targetId: SealData['id'],
	targetStat: number
): SealEfficiency[] => {
	const TOLERANCE = 50
	const getCombinations = (
		remainingItems: SealEfficiency[],
		target: number,
		currentCombination: SealEfficiency[],
		allCombinations: SealEfficiency[][]
	): void => {
		const currentSum = currentCombination.reduce(
			(sum, item) => sum + item.willGetStat,
			0
		)

		// 같은 씰 다른 단계 끼리는 서로 바뀌면 안됨.
		if (currentCombination.some(({ id }) => id === targetId)) {
			return
		}

		if (currentSum >= target && currentSum <= target + TOLERANCE) {
			allCombinations.push([...currentCombination])
			return
		}

		if (currentSum > target + TOLERANCE) {
			return
		}

		// 아직 합이 부족한 경우는 조합을 추가로 채워 넣음
		for (let i = 0; i < remainingItems.length; i++) {
			const item = remainingItems[i]

			// 목표 스탯 넘어가는 조합은 제외
			if (currentSum + item.willGetStat > target + TOLERANCE) {
				continue
			}

			currentCombination.push(item)
			getCombinations(
				remainingItems.slice(i + 1),
				target,
				currentCombination,
				allCombinations
			)
			currentCombination.pop()
		}
	}

	const allCombinations: SealEfficiency[][] = []
	getCombinations(items, targetStat, [], allCombinations)
	if (allCombinations.length === 0) {
		return []
	}

	const calculateTotalEfficiency = (combination: SealEfficiency[]): number => {
		const totalCost = combination.reduce((sum, item) => sum + item.needPrice, 0)
		const totalStat = combination.reduce(
			(sum, item) => sum + item.willGetStat,
			0
		)
		return totalCost > 0 ? totalStat / totalCost : 0
	}

	// Find the combination with the best total efficiency
	const bestCombination = allCombinations.reduce((best, current) => {
		const bestEfficiency = calculateTotalEfficiency(best)
		const currentEfficiency = calculateTotalEfficiency(current)
		return currentEfficiency > bestEfficiency ? current : best
	}, allCombinations[0])

	return bestCombination
}

const findMinimalEfficiencyLoss = (
	itemMap: Map<SealEfficiency, SealEfficiency[]>
): BestCase => {
	let bestCase: BestCase = {
		key: null,
		value: [],
		efficiencyLoss: Infinity
	}

	for (const [key, value] of itemMap) {
		// value 배열의 평균 효율 계산
		const valueAverageEfficiency =
			value.reduce((sum, item) => sum + item.efficiency, 0) / value.length

		// 효율 손실 계산 (원본 대비 얼마나 떨어지는지의 비율)
		const efficiencyLoss =
			((key.efficiency - valueAverageEfficiency) / key.efficiency) * 100

		if (efficiencyLoss < bestCase.efficiencyLoss) {
			bestCase = {
				key,
				value,
				efficiencyLoss
			}
		}
	}

	return bestCase
}

const getStatAverage = (effList: SealEfficiency[]) => {
	const statTotal = effList.reduce(
		(acc, resultSeal) => acc + resultSeal.willGetStat,
		0
	)
	const statAverage = statTotal / effList.length
	return statAverage
}

const getSealsOverAverageStat = (effList: SealEfficiency[]) => {
	return effList.filter((eff) => eff.willGetStat > getStatAverage(effList))
}

const getResultByRemoval = (
	effSeparatedResults: SealEfficiency[],
	goalStat: number,
	willGetStat: number,
	myCrrStat: number
): SealEfficiency[] => {
	const results = [...effSeparatedResults]

	const statGap = myCrrStat + willGetStat - (+goalStat || 0)
	const percentNum = statGap < 1 ? 100 : 1
	const itemStatGap = Math.floor(statGap * percentNum)

	// 목표값보다 높고, 의미있는 차이가 있을 때만 제거 로직 실행
	if (itemStatGap > 10) {
		// 효율 순으로 정렬
		results.sort((a, b) => b.efficiency - a.efficiency)

		let removedStat = 0
		for (let i = results.length - 1; i >= 0; i--) {
			const newRemovedStat = removedStat + results[i].willGetStat
			// 제거 후에도 목표값 이상을 유지하는지 확인
			if (
				newRemovedStat <= itemStatGap &&
				myCrrStat + willGetStat - newRemovedStat >= goalStat
			) {
				removedStat = newRemovedStat
				results.splice(i, 1)
			}
		}
	}

	return results
}

const calculateTotalCost = (seals: SealEfficiency[]): number => {
	return seals.reduce((sum, item) => sum + item.needPrice, 0)
}

export const createCostResultGetter = (myCrrStat: number) => {
	return (
		effDataListSorted: SealEfficiency[],
		goalStat: number,
		effSeparatedResults: CalcResultList['separated'],
		willGetStat: number
	) => {
		const { length } = effSeparatedResults
		const LAST_AFTER_RESULT_LENGTH = Math.max(length / 2, 10)
		const resultLast10 = effSeparatedResults.slice(length - 10)
		const lastAfterResults = effDataListSorted.slice(
			length,
			length + LAST_AFTER_RESULT_LENGTH
		)
		const resultLast10OverAverage = getSealsOverAverageStat(resultLast10)
		const statGap = myCrrStat + willGetStat - (+goalStat || 0)
		const percentNum = statGap < 1 ? 100 : 1

		const combinations = new Map<SealEfficiency, SealEfficiency[]>([])
		for (const overAverageResult of resultLast10OverAverage) {
			const itemStatGap =
				overAverageResult.willGetStat - Math.floor(statGap * percentNum)
			if (itemStatGap < 0) {
				continue
			}

			combinations.set(
				overAverageResult,
				findCombinationsWithTargetStat(
					lastAfterResults,
					overAverageResult.id,
					itemStatGap
				)
			)
		}
		const resultMinimalEfficiencyLoss = findMinimalEfficiencyLoss(combinations)
		if (!resultMinimalEfficiencyLoss.key) {
			console.warn('no resultMinimalEfficiencyLoss')
			return []
		}
		const replacementResult = effSeparatedResults
			.map((eff) => {
				if (
					eff.id === resultMinimalEfficiencyLoss.key?.id &&
					eff.nextStepIdx === resultMinimalEfficiencyLoss.key?.nextStepIdx
				) {
					return resultMinimalEfficiencyLoss.value
				}
				return eff
			})
			.flat()

		const removalResult = getResultByRemoval(
			effSeparatedResults,
			goalStat,
			willGetStat,
			myCrrStat
		)

		const originResultCost = calculateTotalCost(effSeparatedResults)
		const replacementCost = calculateTotalCost(replacementResult)
		const removalCost = calculateTotalCost(removalResult)

		const costBasedResultCost =
			replacementCost < removalCost ? replacementCost : removalCost
		const costBasedResult =
			replacementCost < removalCost ? replacementResult : removalResult
		if (costBasedResultCost >= originResultCost) {
			return []
		}
		return costBasedResult
	}
}
