import type { PriceChartData } from '$entities/seals'
import type { ChartOptions, TooltipItem } from 'chart.js'

export const getChartOptions = (
	chartData: PriceChartData
): ChartOptions<'line'> => ({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			ticks: {
				color: '#888888',
				font: { size: 11 },
				autoSkip: false,
				maxRotation: 45,
				minRotation: 45,
				callback: (value: string | number, index: number) => {
					const total: number = chartData.labels.length
					// 최적의 레이블 표시 개수 결정
					const displayCount: number = determineOptimalLabelCount(total)

					// 표시할 레이블 개수가 전체 개수와 같으면 모두 표시
					if (displayCount >= total) {
						return chartData.labels[index]
					}

					// 균등한 간격 계산 (첫/끝 포함)
					const step: number = (total - 1) / (displayCount - 1)

					// 첫 번째와 마지막 레이블은 항상 표시
					if (index === 0 || index === total - 1) {
						return chartData.labels[index]
					}

					// 나머지는 균등한 간격으로 표시
					// Math.round 대신 Math.abs를 사용해 가장 가까운 인덱스 찾기
					for (let i = 1; i < displayCount - 1; i++) {
						const targetIndex = Math.round(i * step)
						if (index === targetIndex) {
							return chartData.labels[index]
						}
					}

					return null // 기타 레이블은 표시 안 함
				}
			},
			grid: {
				display: true,
				color: '#88888822'
			}
		},
		y: {
			ticks: {
				color: '#888888'
			},
			grid: {
				display: true,
				color: '#88888822'
			}
		}
	},
	plugins: {
		legend: {
			display: false,
			position: 'top' as const
		},
		subtitle: {
			display: true,
			text: '단위: M',
			font: { size: 14 },
			padding: { top: 10, bottom: 10 },
			color: '#333333' // 서브타이틀 색상 변경 (필요시)
		},
		tooltip: {
			callbacks: {
				label: function (context: TooltipItem<'line'>) {
					return `가격: ${context.parsed.y.toLocaleString()}M`
				}
			}
		}
	}
})

function determineOptimalLabelCount(total: number): number {
	// 선호하는 레이블 개수 (6, 7, 8, 9)
	const preferredCounts = [7, 8, 9, 10, 11, 12]

	// 표시할 레이블 개수가 총 레이블 개수보다 클 수 없음
	const validCounts = preferredCounts.filter((count) => count <= total)

	if (validCounts.length === 0) {
		// 모든 선호 개수가 총 개수보다 크면 총 개수 반환
		return total
	}

	// 나머지가 0이 되는(균등 분할 가능한) 개수 찾기
	for (const count of validCounts) {
		if ((total - 1) % (count - 1) === 0) {
			return count
		}
	}

	// 딱 맞는 값이 없으면 가장 큰 유효 값 반환
	return validCounts[validCounts.length - 1]
}
