<script lang="ts">
	import type { PriceChartData } from '$entities/seals'
	import { getChartOptions } from '../lib/chartOption'
	import {
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip,
		type ChartData
	} from 'chart.js'
	import { Line } from 'svelte-chartjs'

	export let chartData: PriceChartData

	// 차트 컴포넌트 등록
	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	)

	// 예시 데이터
	const priceData: ChartData<'line', number[]> = {
		labels: chartData.labels,
		datasets: [
			{
				label: '아이템 가격',
				data: chartData.data,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1,
				pointRadius: 4,
				pointHoverRadius: 10
			}
		]
	}
</script>

<div class="h-[400px]">
	<Line data={priceData} options={getChartOptions(chartData)} />
</div>
