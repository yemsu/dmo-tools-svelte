<script lang="ts">
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		STAT_TYPE_OPTIONS,
		STATS,
		type MySealCount,
		type StatTypeOption
	} from '$entities/seals'
	import { user } from '$entities/user'
	import { META, PATH } from '$shared/config'
	import { cn } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { lang, langPath } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import { NoData } from '$shared/text'
	import {
		getMyAndFinalPrice,
		getMySealData
	} from '$features/calculator/update-my-seal'
	import MySealList from '$features/calculator/display-my-seal/ui/MySealList.svelte'
	import { statTypeOptionStyles } from '$features/calculator/calculate-seal-efficiency'
	import {
		StatBarTotalPrice,
		StatBarWrap
	} from '$features/calculator/display-stat-bar'
	import { _ } from 'svelte-i18n'
	import type { PageData } from './$types'

	export let data: PageData
	let statTypeSelected: StatTypeOption = 'ALL'
	let mySealsFiltered: MySealCount[] | null = null
	$: isKr = $lang === 'kr'
	$: getSelectedSeals = (statTypeOption: StatTypeOption) => {
		statTypeSelected = statTypeOption
		if (statTypeOption === 'ALL') {
			return $mySealCounts
		} else {
			const mySealCounts = $mySealCounts.filter(
				(mySeal) =>
					getMySealData(data.seals, mySeal.id)?.statType === statTypeSelected
			)
			return mySealCounts
		}
	}

	$: initMySealFiltered = () => {
		mySealsFiltered = getSelectedSeals(statTypeSelected)
	}

	$: $mySealCounts && initMySealFiltered()

	const onClickStatType = (statTypeOption: StatTypeOption) => {
		mySealsFiltered = getSelectedSeals(statTypeOption)
	}

	$: getTotalMySealPrice = () => {
		if (!mySealsFiltered) return 0
		let totalPrice = 0
		for (const { id, count } of mySealsFiltered) {
			const price = getMyAndFinalPrice(data.sealPrices, $mySealPrices, id)
			const sumSealPrice = price.final * count
			if (sumSealPrice) totalPrice += sumSealPrice
		}
		return totalPrice
	}

	const getStatName = (statTypeOption: StatTypeOption, _isKr: boolean) => {
		const findStat = STATS.find(({ type }) => type === statTypeOption)
		if (!findStat) return ''
		const nameKey = _isKr ? 'name' : 'engName'
		return findStat[nameKey]
	}
</script>

<svelte:head>
	<title>{META.MY.TITLE[$lang]}</title>
	<meta name="description" content={META.MY.DESC[$lang]} />
</svelte:head>

<h2 class="ir">보유 씰</h2>

<Tabs>
	{#each STAT_TYPE_OPTIONS as statTypeOption (statTypeOption)}
		<Tab
			class={statTypeOptionStyles[statTypeOption]}
			isActive={statTypeSelected === statTypeOption}
			on:click={() => onClickStatType(statTypeOption)}
			title={cn(statTypeOption !== 'ALL' && getStatName(statTypeOption, isKr))}
		>
			{statTypeOption}
		</Tab>
	{/each}
</Tabs>
<div class="flex flex-1 flex-col overflow-hidden">
	<section class="flex flex-1 flex-col gap-2 overflow-hidden">
		<ListReferText tagName="h2" mb={false}>
			<span class="ir">보유 씰 리스트</span>
			{statTypeSelected === 'ALL' ? $_('seal.allStatTypes') : statTypeSelected}
			{#if mySealsFiltered}
				({mySealsFiltered.length}개)
			{/if}
		</ListReferText>
		{#if $myStats}
			<StatBarWrap class="flex-center">
				<StatBarTotalPrice totalPrice={getTotalMySealPrice()} />
			</StatBarWrap>
		{/if}
		{#if $user && mySealsFiltered && mySealsFiltered.length > 0}
			<MySealList
				{mySealsFiltered}
				seals={data.seals}
				sealPrices={data.sealPrices}
			/>
		{:else if mySealsFiltered}
			<NoData>
				{#if isKr}
					보유 씰이 아직 없습니다. <br />
					<a href="{$langPath}{PATH.SETTING_SEALS}" class="font-bold underline">
						씰 설정
					</a>
					메뉴에서 보유하고 있는 씰의 개수를 업데이트 해주세요!
				{:else}
					There are no seals registered yet. <br /> Please update the number of
					seals you own in the
					<a href="{$langPath}{PATH.SETTING_SEALS}" class="font-bold underline">
						Setting Seals
					</a> menu!
				{/if}
			</NoData>
		{/if}
	</section>
</div>
