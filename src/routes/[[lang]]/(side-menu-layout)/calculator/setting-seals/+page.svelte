<script lang="ts">
	import {
		type SealData,
		STAT_TYPE_OPTIONS,
		STATS,
		type StatTypeOption
	} from '$entities/seals'
	import { statTypeOptionStyles } from '$features/calculator/calculate-seal-efficiency'
	import { HowPriceTooltip } from '$features/calculator/display-how-price-tooltip'
	import { SealItem, SealList } from '$features/calculator/display-seal-list'
	import { META } from '$shared/config'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import type { LangType } from '$shared/types'
	import { choseongIncludes } from 'es-hangul'
	import { _ } from 'svelte-i18n'
	import type { PageData } from './$types'

	export let data: PageData
	let statTypeSelected: StatTypeOption = STAT_TYPE_OPTIONS[0]
	let searchText = ''
	let seals = data.seals
	$: searchResults = seals
	$: isKr = $lang === 'kr'
	const updateSearchResult = (_searchText: string, _lang: LangType) => {
		const filterStatTypeSelected =
			statTypeSelected === 'ALL'
				? seals
				: seals.filter(({ statType }) => statType === statTypeSelected)
		if (_searchText === '') {
			searchResults = filterStatTypeSelected
			return
		}

		const results: SealData[] = []
		filterStatTypeSelected.forEach((seal) => {
			const sealName = _lang === 'kr' ? seal.name : seal.engName.toLowerCase()
			if (
				sealName.includes(_searchText.toLowerCase()) ||
				(_lang === 'kr' && choseongIncludes(sealName, _searchText))
			) {
				results.push(seal)
			}
		})
		searchResults = [...results]
	}

	const getStatName = (statTypeOption: StatTypeOption, _isKr: boolean) => {
		const findStat = STATS.find(({ type }) => type === statTypeOption)
		if (!findStat) return ''
		const nameKey = _isKr ? 'name' : 'engName'
		return findStat[nameKey]
	}

	$: onSearchInput = (e: CustomEvent) => {
		const _searchText = e.detail.target.value
		updateSearchResult(_searchText, $lang)
	}

	$: onClickStatType = (statTypeOption: StatTypeOption) => {
		statTypeSelected = statTypeOption
		updateSearchResult(searchText, $lang)
	}
</script>

<svelte:head>
	<title>{META.SETTING.TITLE[$lang]}</title>
	<meta name="description" content={META.SETTING.DESC[$lang]} />
</svelte:head>

<div
	class={cn(
		'flex w-full flex-col items-start gap-1.5',
		'land:flex-row land:items-center land:justify-between'
	)}
>
	<Tabs class="w-full">
		{#each STAT_TYPE_OPTIONS as statTypeOption (statTypeOption)}
			<Tab
				class={cn(statTypeOptionStyles[statTypeOption])}
				isActive={statTypeSelected === statTypeOption}
				on:click={() => onClickStatType(statTypeOption)}
				title={cn(
					statTypeOption !== 'ALL' && getStatName(statTypeOption, isKr)
				)}
			>
				{statTypeOption}
			</Tab>
		{/each}
	</Tabs>
	<Input
		id="search"
		maxlength={30}
		placeholder={isKr ? '씰 이름을 검색하세요' : 'Search for seal names'}
		class="port:w-full land:w-[30%] land:shrink-0"
		bind:value={searchText}
		on:input={onSearchInput}
	/>
</div>
<div class="flex flex-1 flex-col overflow-hidden">
	<div class="mb-2 flex items-center justify-between">
		<ListReferText tagName="h2" mb={false}>
			<span class="ir">씰 세팅 - </span>
			{statTypeSelected === 'ALL' ? $_('seal.allStatTypes') : statTypeSelected}
			{#if searchText}
				&gt; "{searchText}"
			{/if}
			({searchResults.length}{$_('count_unit')})
		</ListReferText>

		<HowPriceTooltip />
	</div>
	<SealList
		seals={searchResults}
		isLoading={seals.length === 0}
		let:seal
		noDataText={isKr ? '검색 결과가 존재하지 않습니다.' : 'No results found.'}
	>
		<SealItem {seal} sealPrices={data.sealPrices} />
	</SealList>
</div>
