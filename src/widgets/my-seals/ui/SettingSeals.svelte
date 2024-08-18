<script lang="ts">
	import { page } from '$app/stores'
	import { type SealData } from '$entities/seals'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import { CrrMenuTitle } from '$shared/text'
	import { SealItem, SealList } from '$widgets/seal-list'
	import {
		STAT_TYPE_OPTIONS,
		STATS,
		statTypeOptionStyles,
		type StatTypeOption
	} from '$widgets/my-seals'
	import { choseongIncludes } from 'es-hangul'

	let statTypeSelected: StatTypeOption = STAT_TYPE_OPTIONS[0]
	let searchText = ''
	let seals = $page.data.seals
	$: searchResults = seals

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
		console.log('sdf?', seals)
		statTypeSelected = statTypeOption
		updateSearchResult(searchText)
	}
</script>

<Section>
	<CrrMenuTitle />
	<div
		class={cn(
			'flex w-full flex-col items-start gap-2',
			'md:flex-row md:items-center md:justify-between'
		)}
	>
		<Tabs class="w-full md:w-[40%]">
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
			class="flex-1"
			bind:value={searchText}
			on:input={onSearchInput}
		/>
	</div>
	<section class="flex flex-1 flex-col overflow-hidden">
		<ListReferText tagName="h2">
			{searchText ? `'${searchText}'` : '모든'} 검색어 &gt;
			{statTypeSelected === 'ALL' ? '모든 스탯 타입' : statTypeSelected}
			({searchResults.length}개)
		</ListReferText>
		<SealList
			seals={searchResults}
			isLoading={seals.length === 0}
			let:seal
			noDataText="검색 결과가 존재하지 않습니다."
		>
			<SealItem {seal} />
		</SealList>
	</section>
</Section>
