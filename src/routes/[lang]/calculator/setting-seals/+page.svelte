<script lang="ts">
	import { page } from '$app/stores'
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
	import { Tab, Tabs } from '$shared/tabs'
	import { Tooltip } from '$shared/tooltip'
	import { statTypeOptionStyles } from '$widgets/my-seals'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { choseongIncludes } from 'es-hangul'
	import type { LangType } from '$shared/types'

	let statTypeSelected: StatTypeOption = STAT_TYPE_OPTIONS[0]
	let searchText = ''
	let seals = $page.data.seals
	$: searchResults = seals
	$: lang = $page.data.lang as LangType
	const updateSearchResult = (_searchText: string) => {
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
			if (
				seal.name.includes(_searchText) ||
				choseongIncludes(seal.name, _searchText)
			) {
				results.push(seal)
			}
		})
		searchResults = [...results]
	}

	const onSearchInput = (e: CustomEvent) => {
		const _searchText = e.detail.target.value
		updateSearchResult(_searchText)
	}

	$: onClickStatType = (statTypeOption: StatTypeOption) => {
		statTypeSelected = statTypeOption
		updateSearchResult(searchText)
	}
</script>

<svelte:head>
	<title>{META.SETTING.TITLE[lang]}</title>
	<meta name="description" content={META.SETTING.DESC[lang]} />
</svelte:head>

<h2 class="ir">씰 세팅</h2>
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
				title={statTypeOption === 'ALL'
					? '전체'
					: STATS.find(({ type }) => type === statTypeOption)?.name}
			>
				{statTypeOption}
			</Tab>
		{/each}
	</Tabs>
	<Input
		id="search"
		maxlength={30}
		placeholder="씰 이름을 검색하세요"
		class="w-full flex-1 md:w-auto"
		bind:value={searchText}
		on:input={onSearchInput}
	/>
</div>
<section class="flex flex-1 flex-col overflow-hidden">
	<div class="mb-2 flex items-center justify-between">
		<ListReferText tagName="h2" mb={false}>
			{searchText ? `'${searchText}'` : '모든'} 검색어 &gt;
			{statTypeSelected === 'ALL' ? '모든 스탯 타입' : statTypeSelected}
			({searchResults.length}개)
		</ListReferText>

		<div class="flex-center relative gap-4">
			<button
				class={cn(
					'flex-center peer gap-0.5 text-right text-xs3',
					'text-gray-300 md:text-left md:text-xs'
				)}
			>
				<iconify-icon icon="ic:outline-info" width={14} height={14} />
				가격은 어떻게 설정되나요?
			</button>
			<Tooltip class="-bottom-2 right-0 w-[310px] translate-y-full pr-2">
				<p>
					<span class="text-point">루체 서버</span>를 기준으로, 각 씰의
					<span class="text-point">위탁 거래소 <br />1페이지 매물 가격</span>의
					가중 평균으로 책정됩니다. <br />
					가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
					<span class="text-point">구매 전 확인</span>이 필요합니다.
				</p>
			</Tooltip>
		</div>
	</div>
	<SealList
		seals={searchResults}
		isLoading={seals.length === 0}
		let:seal
		noDataText="검색 결과가 존재하지 않습니다."
	>
		<SealItem {seal} />
	</SealList>
</section>
