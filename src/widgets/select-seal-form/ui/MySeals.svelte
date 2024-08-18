<script lang="ts">
	import { page } from '$app/stores'
	import { myPrices, mySeals, myStats, type MySeal } from '$entities/seals'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import { CrrMenuTitle } from '$shared/text'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { StatBar } from '$widgets/stat-bar'
	import { onMount } from 'svelte'
	import {
		STAT_TYPE_OPTIONS,
		STATS,
		statTypeOptionStyles,
		type StatTypeOption
	} from '../config'
	import { getMyAndFinalPrice, getMySealData } from '../lib/helper'
	import MySealGrade from './MySealGrade.svelte'
	import ListReferText from '$shared/list/ui/ListReferText.svelte'

	let statTypeSelected = 'ALL'
	let mySealsFiltered: MySeal[] = []

	onMount(() => {
		mySealsFiltered = $mySeals
	})

	const onClickStatType = (statTypeOption: StatTypeOption) => {
		statTypeSelected = statTypeOption
		if (statTypeOption === 'ALL') {
			mySealsFiltered = $mySeals
		} else {
			const mySealDataList = $mySeals.filter(
				(mySeal) =>
					getMySealData($page.data.seals, mySeal.id)?.statType ===
					statTypeSelected
			)
			mySealsFiltered = mySealDataList
		}
	}

	const onClickMySealDelete = (sealId: number) => {
		const isConfirmed = confirm(
			'해당 씰을 제거하시겠어요? 삭제된 데이터는 복구가 불가능 합니다.'
		)
		if (!isConfirmed) return
		mySeals.remove(sealId)
	}

	$: getTotalMySealPrice = () => {
		let totalPrice = 0
		for (const { id, count } of $mySeals) {
			const price = getMyAndFinalPrice($page.data.sealPrices, $myPrices, id)
			const sumSealPrice = price.final * count
			if (sumSealPrice) totalPrice += sumSealPrice
		}
		return totalPrice
	}
</script>

<Section>
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
		<ListReferText tagName="p">
			<iconify-icon
				icon="ep:warn-triangle-filled"
				width={15}
				height={15}
				class="-mb-[0.3em]"
			/>
			설정한 씰과 가격 데이터는 모두 url에 저장됩니다. url을 잘 보관해 주세요!
		</ListReferText>
		<section class="flex flex-1 flex-col overflow-hidden">
			<h2 class="ir">
				보유 씰 리스트({statTypeSelected}): 총 {mySealsFiltered.length}개
			</h2>
			<SealList
				seals={mySealsFiltered}
				let:seal={mySeal}
				noDataText="보유 씰이 아직 없습니다. 씰 설정 메뉴에서 보유하고 있는 씰의 개수를 업데이트 해주세요!"
				class="h-full"
			>
				<SealItem seal={getMySealData($page.data.seals, mySeal.id)}>
					<MySealGrade {mySeal} />
					<button
						class="absolute right-[1px] top-[1px]"
						on:click={() => onClickMySealDelete(mySeal.id)}
						title="삭제"
					>
						<iconify-icon icon="mdi:close" width={14} height={14} />
					</button>
				</SealItem>
			</SealList>
		</section>
	</div>
</Section>
