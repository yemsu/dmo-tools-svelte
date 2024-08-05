<script lang="ts">
	import { seals, type MySeal, type SealData } from '$entities/seals'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealMenuList from '$widgets/seal-list/ui/SealMenuList.svelte'
	import { STAT_TYPES, type StatType } from '$widgets/select-seal-form/config'
	import { choseongIncludes } from 'es-hangul'
	import { onMount } from 'svelte'

	type Form = Partial<MySeal>

	const defaultForm: Form = {}
	type StatTypeOptions = StatType | 'ALL'
	const STAT_TYPE_OPTIONS: StatTypeOptions[] = ['ALL', ...STAT_TYPES]
	export const statColorStyles: Record<StatTypeOptions, string> = {
		ALL: 'border border-white/50 bg-white/10 px-2 py-1 text-white',
		AT: 'bg-stat-at/10 text-stat-at border border-stat-at/50',
		HT: 'bg-stat-ht/10 text-stat-ht border border-stat-ht/50',
		CT: 'bg-stat-ct/10 text-stat-ct border border-stat-ct/50'
	}
	let form: Form = defaultForm
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

	$: onCheck = (statTypeOption: StatTypeOptions) => {
		statTypeSelected = statTypeOption
		updateSearchResult(searchText)
	}
</script>

<Section class="md:h-full md:overflow-hidden">
	<Title>전체 씰</Title>
	<div class="flex flex-1 flex-col gap-4 overflow-hidden">
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
							on:click={() => onCheck(statTypeOption)}
						>
							{statTypeOption}
						</button>
					</li>
				{/each}
			</ul>
		</div>
		<button class="variant-filled-primary py-1 text-xs"
			>최신 가격 일괄 적용</button
		>
		<button class="variant-filled-primary text-xs"
			>많이 입력된 가격 일괄 적용</button
		>
		<p class="text-xs text-primary-50">
			{searchText ? `'${searchText}'` : '모든'} 검색어 &gt;
			{statTypeSelected === 'ALL' ? '모든 스탯 타입' : statTypeSelected}
			({searchResults.length}개)
		</p>
		<div class="flex flex-1 flex-col overflow-hidden">
			<SealMenuList
				seals={searchResults}
				isLoading={$seals.length === 0}
				let:seal
				selectedSealId={form.sealId}
			>
				<SealItem {seal} />
			</SealMenuList>
		</div>
	</div>
</Section>
