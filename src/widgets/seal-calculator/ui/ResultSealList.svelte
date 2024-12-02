<script lang="ts">
	import { type SealData, type SealPrice } from '$entities/seals'
	import { AddToMySealButton } from '$features/update-my-seal'
	import { SealCalcData } from '$widgets/seal-calculator'
	import {
		calcStore,
		type SealEfficiency
	} from '$features/calculate-seal-efficiency'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { _ } from 'svelte-i18n'

	export let seals: SealData[]
	export let sealPrices: SealPrice[]
	export let isPercentType: boolean

	$: afterAddToMySeal = (effData: SealEfficiency) => {
		const updateEffDataListSorted = $calcStore.effDataListSorted.filter(
			(_effData) =>
				!(
					_effData.id === effData.id && _effData.needCount === effData.needCount
				)
		)
		calcStore.setEffDataListSorted(updateEffDataListSorted)
		calcStore.setCalcResultList(updateEffDataListSorted)
		calcStore.subtractTotal(effData)
	}
</script>

<SealList
	seals={$calcStore.calcResultList}
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
