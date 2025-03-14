<script lang="ts">
	import type { SealData, SealsPriceChartData } from '$entities/seals'
	import PriceChart from './PriceChart.svelte'
	import Icon from '$shared/icon/Icon.svelte'
	import { calculateAverage, cn, numberFormatter } from '$shared/lib'
	import { Modal } from '$shared/modal'
	import { _ } from 'svelte-i18n'

	import { getContext } from 'svelte'
	import Title from '$shared/text/ui/Title.svelte'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import HowPriceTooltip from '$features/calculator/display-how-price-tooltip/ui/HowPriceTooltip.svelte'

	export let seal: SealData
	let sealsPriceChart = getContext('sealsPriceChart') as SealsPriceChartData
	$: sealPriceChart = sealsPriceChart[seal.id]
</script>

<Modal size="lg">
	<button
		slot="buttonSlot"
		class={cn(
			'w-[30px] bg-background/50 sm:w-[25px]',
			sealPriceChart
				? 'text-blue-9 opacity-80 hover:bg-blue-9 hover:text-background hover:opacity-100'
				: 'text-blue-9/40'
		)}
		title={sealPriceChart
			? $_('seal.seal_price_history')
			: $_('seal.no_seal_prices')}
		disabled={!sealPriceChart}
		let:toggleModal
		on:click={toggleModal}
	>
		<Icon icon="uil:chart-line" size="1.2em" />
	</button>
	<section slot="popupContent" class="flex flex-col gap-2">
		<div class="flex items-end justify-between pb-2 pt-4">
			<Title class="text-left"
				><TextByLang
					text={`${seal.name} - 가격 변동 그래프`}
					engText={`${seal.engName} - Seal Price Trend`}
				/></Title
			>
			<HowPriceTooltip />
		</div>
		{#if sealPriceChart}
			<div class="overflow-auto">
				<PriceChart chartData={sealPriceChart} />
			</div>
			<dl
				class="mt-2 flex justify-center gap-2 rounded-md bg-gray-2 p-4 text-body-lg text-point sm:p-3"
			>
				<dt>평균가</dt>
				<dd>{numberFormatter(calculateAverage(sealPriceChart.data), 3)} M</dd>
			</dl>
		{/if}
	</section>
</Modal>
