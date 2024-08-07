<script lang="ts">
	import { mySeals, myStats, sealPrices, seals } from '$entities/seals'
	import { Section } from '$shared/section'
	import { CrrMenuTitle } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'
	import StatBar from '$widgets/stat-bar/ui/StatBar.svelte'

	$: getTotalMySealPrice = () => {
		let totalPrice = 0
		for (const { id, count } of $mySeals) {
			const sumSealPrice =
				($sealPrices.find((sealPrice) => sealPrice.sealId === id)?.price || 0) *
				count
			if (sumSealPrice) totalPrice += sumSealPrice
		}
		return totalPrice
	}
</script>

<Section class="flex w-full overflow-hidden">
	<CrrMenuTitle />
	<StatBar stats={$myStats} totalPrice={getTotalMySealPrice()} />
	<SealList
		seals={$mySeals}
		let:seal={mySeal}
		noDataText="세팅된 보유 씰이 없습니다."
	>
		<SealItem seal={getMySealData($seals, mySeal.id)}
			><button
				class="absolute right-[1px] top-[1px]"
				on:click={() => mySeals.remove(mySeal.id)}
				title="삭제"
			>
				<iconify-icon icon="mdi:close" width={14} height={14} />
			</button>
		</SealItem>
	</SealList>
</Section>
