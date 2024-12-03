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
		if (currentCombination.some(({ id }) => id === targetId)) {
			return
		}

		if (currentSum === target) {
			allCombinations.push([...currentCombination])
			return
		}

		if (currentSum > target) {
			return
		}

		for (let i = 0; i < remainingItems.length; i++) {
			const item = remainingItems[i]

			// Skip items that would exceed our target
			if (currentSum + item.willGetStat > target) {
				continue
			}

			// Try including this item
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
		getCombinations(items, targetStat + 5, [], allCombinations)
	}
	if (allCombinations.length === 0) {
		getCombinations(items, targetStat + 10, [], allCombinations)
	}
	if (allCombinations.length === 0) {
		getCombinations(items, targetStat + 15, [], allCombinations)
	}
	if (allCombinations.length === 0) {
		getCombinations(items, targetStat + 20, [], allCombinations)
	}
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

export const createClosestResultGetter = (myCrrStat: number) => {
	return (
		effDataListSorted: SealEfficiency[],
		goalStat: number,
		effSeparatedResults: CalcResultList['efficiency']['separated'],
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
		const combinations = new Map<SealEfficiency, SealEfficiency[]>([])
		console.log('statGap', statGap, myCrrStat, willGetStat, +goalStat)
		for (const overAverageResult of resultLast10OverAverage) {
			combinations.set(
				overAverageResult,
				findCombinationsWithTargetStat(
					lastAfterResults,
					overAverageResult.id,
					overAverageResult.willGetStat - statGap
				)
			)
		}
		const resultMinimalEfficiencyLoss = findMinimalEfficiencyLoss(combinations)
		if (!resultMinimalEfficiencyLoss.key) {
			alert('no resultMinimalEfficiencyLoss')
			return []
		}
		const result = effSeparatedResults
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

		return result
	}
}
