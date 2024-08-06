<script lang="ts">
	import { seals, type MySeal, type SealData } from '$entities/seals'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { STAT_TYPES, type StatType } from '$widgets/select-seal-form/config'
	import { choseongIncludes } from 'es-hangul'

	type StatTypeOptions = StatType | 'ALL'
	const STAT_TYPE_OPTIONS: StatTypeOptions[] = ['ALL', ...STAT_TYPES]
	export const statColorStyles: Record<StatTypeOptions, string> = {
		ALL: 'border border-white/50 bg-white/10 px-2 py-1 text-white',
		AT: 'bg-stat-at/10 text-stat-at border border-stat-at/50',
		HT: 'bg-stat-ht/10 text-stat-ht border border-stat-ht/50',
		CT: 'bg-stat-ct/10 text-stat-ct border border-stat-ct/50'
	}
	let statTypeSelected: StatTypeOptions = STAT_TYPE_OPTIONS[0]
	let searchText = ''
	$: searchResults = $seals

	const updateSearchResult = (_searchText: string) => {
		const filterStatTypeSelected =
			statTypeSelected === 'ALL'
				? $seals
				: $seals.filter(({ statType }) => statType === statTypeSelected)
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

	$: onClickStatType = (statTypeOption: StatTypeOptions) => {
		statTypeSelected = statTypeOption
		updateSearchResult(searchText)
	}
</script>

<Section class="md:h-full">
	<Title>전체 씰</Title>
	<div class="flex flex-1 flex-col gap-3 overflow-hidden">
		<div class="flex w-full items-center justify-between gap-3">
			<Input
				id="search"
				maxlength={30}
				placeholder="씰이름을 검색하세요"
				class="flex-1"
				bind:value={searchText}
				on:input={onSearchInput}
			/>
			<ul class="flex items-center gap-2 text-xs font-bold">
				{#each STAT_TYPE_OPTIONS as statTypeOption (statTypeOption)}
					<li>
						<button
							class={cn(
								'w-[3.5em] rounded-full px-2 py-1 opacity-40 transition-opacity hover:opacity-100',
								statColorStyles[statTypeOption],
								'data-[active=true]:border-2 data-[active=true]:opacity-100'
							)}
							data-active={statTypeSelected === statTypeOption}
							on:click={() => onClickStatType(statTypeOption)}
						>
							{statTypeOption}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<div class="flex flex-1 flex-col overflow-hidden">
			<p class="mb-2 text-xs text-primary-50">
				{searchText ? `'${searchText}'` : '모든'} 검색어 &gt;
				{statTypeSelected === 'ALL' ? '모든 스탯 타입' : statTypeSelected}
				({searchResults.length}개)
			</p>
			<SealList
				seals={searchResults}
				isLoading={$seals.length === 0}
				let:seal
				noDataText="검색 결과가 존재하지 않습니다."
			>
				<SealItem {seal} />
			</SealList>
		</div>
	</div>
</Section>
