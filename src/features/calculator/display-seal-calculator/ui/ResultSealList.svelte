<script lang="ts">
	import { type SealData, type SealPrice } from '$entities/seals'
	import {
		calc,
		getCurrentStep,
		type SealEfficiency
	} from '$features/calculator/calculate-seal-efficiency'
	import { AddToMySealButton } from '$features/calculator/update-my-seal'
	import { SealCalcData } from '$features/calculator/display-seal-calculator'
	import { SealItem, SealList } from '$features/calculator/display-seal-list'
	import { _ } from 'svelte-i18n'

	export let seals: SealData[]
	export let sealPrices: SealPrice[]
	export let isPercentType: boolean
	export let percentNum: number
	$: crrCalcResults = $calc.calcResults[$calc.viewMode]
	$: afterAddToMySeal = (effData: SealEfficiency) => {
		calc.subtractResultTotal(effData, percentNum)
	}
</script>

<SealList
	seals={crrCalcResults}
	let:seal={effData}
	noDataText={$_('seal.no_data_text')}
>
	{@const seal = seals.find(({ id }) => id === effData.id)}
	{#if seal}
		{@const crrStep = getCurrentStep(seal, effData.needCount)}
		<SealItem {seal} isCountEditable={false} {sealPrices}>
			<p class="absolute right-1 top-0 text-sub-md text-gray-8">
				{crrStep.grade?.name}
			</p>
			<SealCalcData {effData} {isPercentType} />
			<AddToMySealButton
				{effData}
				{seal}
				updateResult={() => afterAddToMySeal(effData)}
			/>
		</SealItem>
	{/if}
</SealList>
