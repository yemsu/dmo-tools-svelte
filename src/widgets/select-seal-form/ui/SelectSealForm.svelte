<script lang="ts">
	import { seals, type MySeal, type SealData } from '$entities/seals'
	import { mySeals } from '$entities/seals/model'
	import { apiFetch } from '$shared/api'
	import { Input } from '$shared/form'
	import { SealItem } from '$widgets/seal-list'
	import SealMenuList from '$widgets/seal-list/ui/SealMenuList.svelte'
	import {
		STAT_TYPES,
		statColorStyles,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { choseongIncludes } from 'es-hangul'
	import { onMount } from 'svelte'

	type Form = Partial<MySeal>

	const defaultForm: Form = {}

	export let saveMySeals: () => void
	let form: Form = defaultForm
	let statCheckboxes: Record<StatType, boolean> = {
		AT: true,
		HT: true,
		CT: true
	}
	let searchText = ''
	let searchResults: SealData[] = []
	let inputElement: HTMLInputElement

	onMount(async () => {
		const data = await apiFetch<SealData[]>('/seals')
		searchResults = [...data]
		seals.set(data)
	})

	const updateSearchResult = (_searchText: string) => {
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

	const onCheck = (e: CustomEvent) => {
		const { id, checked } = e.detail.target
		if (checked) {
			updateSearchResult(searchText)
		} else {
			searchResults = [
				...searchResults.filter(({ statType }) => statType !== id)
			]
		}
	}

	const checkCountValue = (count: Form['count']) => {
		if (count === 0) {
			count = undefined
		} else if (count) {
			count = count * 1
			if (count > 3000) {
				count = 3000
			}
		}
		return count
	}

	const onCountInput = (e: Event) => {
		const target = e.target as HTMLInputElement
		const count = +target.value
		const countChecked = checkCountValue(count)
		form = { ...form, count: countChecked }
	}

	const getMySeal = (_sealId: number) => {
		return $mySeals.find(({ sealId }) => sealId === _sealId)
	}

	const selectSeal = (selectedSeal: SealData) => {
		const sealId = selectedSeal.id
		const count = getMySeal(sealId)?.count || 0
		form = { sealId, count }
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const onblur = () => {
		form = {}
	}

	const onSubmit = () => {
		const { sealId, count } = form
		if (!sealId) {
			alert('보유 중인 씰을 선택해주세요.')
			return
		}
		if (!count) {
			alert('보유 중인 씰의 개수를 설정해주세요.')
			return
		}
		if (count > 3000) {
			form = { ...form, count: 3000 }
		}

		const newMySeal: MySeal = {
			sealId,
			count
		}
		const alreadyExist = $mySeals.find((mySeal) => mySeal.sealId === sealId)
		if (alreadyExist) {
			mySeals.modify(newMySeal)
		} else {
			mySeals.add(newMySeal)
		}
		form = { ...defaultForm }
		saveMySeals()
	}
</script>

<div class="flex flex-col items-start gap-4">
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
	<form on:submit|preventDefault={onSubmit} class="w-full">
		<SealMenuList
			seals={searchResults}
			let:seal
			selectedSealId={form.sealId}
			onClickSeal={selectSeal}
		>
			<SealItem
				{seal}
				count={form.sealId === seal.id
					? undefined
					: getMySeal(seal.id)?.count || 0}
			/>
			{#if form.sealId === seal.id}
				<span class="flex items-center justify-center gap-1 bg-primary-50">
					<span class="w-[4em] overflow-hidden">
						<input
							bind:this={inputElement}
							type="number"
							id={`count-${seal.id}`}
							class="w-full bg-primary-200 p-1 text-xs text-white"
							placeholder="씰 개수"
							bind:value={form.count}
							on:input={onCountInput}
							on:blur|once={onblur}
						/>
					</span>
					<span>개</span>
				</span>
			{/if}
		</SealMenuList>
	</form>
</div>
