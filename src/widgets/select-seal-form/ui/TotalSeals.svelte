<script lang="ts">
	import { seals, type MySeal, type SealData } from '$entities/seals'
	import { Input } from '$shared/form'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealMenuList from '$widgets/seal-list/ui/SealMenuList.svelte'
	import {
		STAT_TYPES,
		statColorStyles,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { choseongIncludes } from 'es-hangul'

	type Form = Partial<MySeal>

	const defaultForm: Form = {}

	let form: Form = defaultForm
	let statCheckboxes: Record<StatType, boolean> = {
		AT: true,
		HT: true,
		CT: true
	}
	let searchText = ''
	$: searchResults = $seals

	$: updateSearchResult = (_searchText: string) => {
		const sealFilteredStat = $seals.filter(
			({ statType }) => statCheckboxes[statType]
		)
		if (_searchText === '') {
			searchResults = sealFilteredStat
			return
		}

		const results: SealData[] = []
		sealFilteredStat.forEach((seal) => {
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

	$: onCheck = (e: CustomEvent) => {
		const { id, checked } = e.detail.target
		if (checked) {
			updateSearchResult(searchText)
		} else {
			searchResults = [
				...searchResults.filter(({ statType }) => statType !== id)
			]
		}
	}
</script>

<Section class="md:h-full md:overflow-hidden">
	<Title>전체 씰</Title>
	<div class="flex flex-1 flex-col gap-4 overflow-hidden">
		<div class="flex w-full items-center justify-between">
			<Input
				id="search"
				maxlength={30}
				placeholder="씰이름을 검색하세요"
				bind:value={searchText}
				on:input={onSearchInput}
			/>
			<ul class="flex">
				{#each STAT_TYPES as statType (statType)}
					<li class="text-xs font-bold {statColorStyles[statType]}">
						<Input
							id={statType}
							label={statType}
							type="checkbox"
							checked={statCheckboxes[statType]}
							on:input={onCheck}
							class="checkbox"
						/>
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
		<div class="flex-1 overflow-hidden">
			<SealMenuList seals={searchResults} let:seal selectedSealId={form.sealId}>
				<SealItem {seal} />
			</SealMenuList>
		</div>
	</div>
</Section>
