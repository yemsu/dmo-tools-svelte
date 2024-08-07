<script lang="ts">
	import { mySeals, myStats, sealPrices, seals } from '$entities/seals'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import { CrrMenuTitle } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import {
		STAT_TYPE_OPTIONS,
		STATS,
		statTypeOptionStyles,
		type StatTypeOption
	} from '$widgets/select-seal-form'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'
	import StatBar from '$widgets/stat-bar/ui/StatBar.svelte'

	let statTypeSelected = 'ALL'
	$: mySealsFiltered = $mySeals
	const onClickStatType = (statTypeOption: StatTypeOption) => {
		statTypeSelected = statTypeOption
		if (statTypeOption === 'ALL') {
			mySealsFiltered = $mySeals
		} else {
			const mySealDataList = $mySeals.filter(
				(mySeal) =>
					getMySealData($seals, mySeal.id)?.statType === statTypeSelected
			)
			mySealsFiltered = mySealDataList
		}
	}

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

	<Tabs>
		{#each STAT_TYPE_OPTIONS as statTypeOption (statTypeOption)}
			<Tab
				class={statTypeOptionStyles[statTypeOption]}
				isActive={statTypeSelected === statTypeOption}
				on:click={() => onClickStatType(statTypeOption)}
				title={statTypeOption === 'ALL'
					? '전체'
					: STATS.find(({ type }) => type === statTypeOption)?.name}
			>
				{statTypeOption}
			</Tab>
		{/each}
	</Tabs>
	<SealList
		seals={mySealsFiltered}
		let:seal={mySeal}
		noDataText="보유 씰이 없습니다."
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
