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
	{#if $myStats}
		<StatBar stats={$myStats} totalPrice={getTotalMySealPrice()} />
	{/if}

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
	<div class="flex flex-1 flex-col overflow-hidden">
		<p class="mb-2 text-xs font-bold text-point">
			<iconify-icon
				icon="ep:warn-triangle-filled"
				width={15}
				height={15}
				class="-mb-[0.3em]"
			/>
			설정한 씰과 가격 데이터는 모두 url에 저장됩니다. url을 잘 보관해 주세요!
		</p>
		<SealList
			seals={mySealsFiltered}
			let:seal={mySeal}
			noDataText="보유 씰이 아직 없습니다. 씰 설정 메뉴로 가서 씰을 설정해 보세요!"
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
	</div>
</Section>
