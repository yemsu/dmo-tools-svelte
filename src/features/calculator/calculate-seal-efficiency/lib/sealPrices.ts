import type {
	PriceChartData,
	SealPrice,
	SealPriceHistory,
	SealsPriceChartData
} from '$entities/seals'

// sealPricesHistory 데이터 가공하여 seals price chart 데이터 생성
export function generateSealsPriceChart(sealPricesHistory: SealPriceHistory[]) {
	const sealsPriceChart = sealPricesHistory.reduce<SealsPriceChartData>(
		(result, sealPriceHistory) => {
			let sealPriceChart: PriceChartData | null = null
			if (!sealPriceHistory.history) {
				sealPriceChart = null
			} else {
				const removedOutliers = removeExtremeOutliers(sealPriceHistory.history)
				// const removedOutliers = sealPriceHistory.history
				const labels = removedOutliers.map(({ createdAt }) =>
					createdAt.split('T')[0].replaceAll('-', '.').replace('202', '2')
				)
				const data = removedOutliers.map(({ price }) => price)

				sealPriceChart = { labels, data }
			}
			result[sealPriceHistory.sealId] = sealPriceChart
			return result
		},
		{}
	)
	return sealsPriceChart
}

// 중앙값에서 많이 벗어난 값 제외
function removeExtremeOutliers(
	items: Pick<SealPrice, 'createdAt' | 'price'>[],
	iterations = 2,
	threshold = 5
) {
	let filteredItems = [...items]

	// 반복적으로 필터링 적용
	for (let i = 0; i < iterations; i++) {
		// 현재 필터링된 아이템에서 가격 추출
		const prices = filteredItems.map((item) => item.price)

		// 중앙값 계산
		const sortedPrices = [...prices].sort((a, b) => a - b)

		// 빈 배열 체크
		if (sortedPrices.length === 0) break

		const median = sortedPrices[Math.floor(sortedPrices.length / 2)]

		// 필터링 적용
		filteredItems = filteredItems.filter(
			(item) =>
				item.price >= median / threshold && item.price <= median * threshold
		)
	}

	return filteredItems
}
