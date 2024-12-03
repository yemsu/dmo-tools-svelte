<script lang="ts">
	import { type SealData, type SealPrice } from '$entities/seals'
	import {
		calc,
		type SealEfficiency
	} from '$features/calculate-seal-efficiency'
	import { AddToMySealButton } from '$features/update-my-seal'
	import { SealCalcData } from '$widgets/seal-calculator'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { _ } from 'svelte-i18n'

	export let seals: SealData[]
	export let sealPrices: SealPrice[]
	export let isPercentType: boolean
	export let percentNum: number
	$: crrCalcResults = $calc.calcResults[$calc.calcMode][$calc.viewMode]

	$: afterAddToMySeal = (effData: SealEfficiency) => {
		const updateEffDataListSorted = crrCalcResults.filter(
			(_effData) =>
				!(
					_effData.id === effData.id && _effData.needCount === effData.needCount
				)
		)
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
		<SealItem {seal} isCountEditable={false} {sealPrices}>
			<p class="absolute right-1 top-0 text-sub-md text-gray-8">
				{effData.nextStepIdx + 1} 단계
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
