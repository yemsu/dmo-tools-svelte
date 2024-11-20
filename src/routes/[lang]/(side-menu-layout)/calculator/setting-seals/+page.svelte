<script lang="ts">
	import {
		type SealData,
		STAT_TYPE_OPTIONS,
		STATS,
		type StatTypeOption
	} from '$entities/seals'
	import { META } from '$shared/config'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { Tooltip } from '$shared/tooltip'
	import type { LangType } from '$shared/types'
	import { statTypeOptionStyles } from '$widgets/my-seals'
	import { SealItem, SealList } from '$widgets/seal-list'
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
		'md:flex-row md:items-center md:justify-between'
	)}
>
	<Tabs class="w-full md:w-[70%]">
		{#each STAT_TYPE_OPTIONS as statTypeOption (statTypeOption)}
			<Tab
				class={statTypeOptionStyles[statTypeOption]}
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
		class="w-full flex-1 md:w-auto"
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

		<div class="flex-center relative gap-4">
			<button
				class={cn(
					'flex-center peer gap-0.5 text-right text-body-sm',
					'text-gray-11 md:text-left md:text-sub-md'
				)}
			>
				<iconify-icon icon="ic:outline-info" width={14} height={14} />
				<TextByLang
					text="가격은 어떻게 설정되나요?"
					engText="How are prices set?"
				/>
			</button>
			<Tooltip class="-bottom-2 right-0 w-[310px] translate-y-full pr-2">
				<p>
					{#if isKr}
						<span class="text-point">루체 서버</span>를 기준으로, 각 씰의
						<span class="text-point">위탁 거래소 <br />1페이지 매물 가격</span
						>의 가중 평균으로 책정됩니다. <br />
						가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
						<span class="text-point">구매 전 확인</span>이 필요합니다.
					{:else}
						Based on the <span class="text-point"
							>Omega server of the Steam version</span
						>, seal prices are set using the weighted average of listings
						<span class="text-point">on the first data of the marketplace</span
						>. However, due to potential price fluctuations or listing errors,
						there’s a chance that the prices may not be accurate. Please
						<span class="text-point"> verify the prices </span> before making any
						purchases.
					{/if}
				</p>
			</Tooltip>
		</div>
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
