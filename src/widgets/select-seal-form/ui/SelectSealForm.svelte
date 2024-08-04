<script lang="ts">
	import { seals, type SealData } from '$entities/seals'
	import { mySeals } from '$entities/seals/model'
	import { apiFetch } from '$shared/api'
	import { Input } from '$shared/form'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import type { MySeal } from '$widgets/select-seal-form/type'
	import { choseongIncludes } from 'es-hangul'
	import { onMount } from 'svelte'

	type Form = Partial<MySeal>

	const defaultForm = {
		seal: undefined,
		count: undefined
	}

	export let saveData: () => void
	let form: Form = defaultForm
	let searchResults: SealData[] = []

	onMount(async () => {
		const data = await apiFetch<SealData[]>('/seals')
		searchResults = [...data]
		seals.set(data)
	})

	const selectSeal = (selectedSeal: SealData) => {
		form = { ...form, seal: selectedSeal }
	}

	const onSubmit = () => {
		if (!form.seal) {
			alert('보유 중인 씰을 선택해주세요.')
			return
		}
		if (!form.count) {
			alert('보유 중인 씰의 개수를 설정해주세요.')
			return
		}
		if (form.count > 3000) {
			form = { ...form, count: 3000 }
		}
		mySeals.add(form as NonNullable<MySeal>)
		form = { ...defaultForm }
		saveData()
	}

	const onSearchInput = (e: CustomEvent) => {
		const value = e.detail.target.value
		if (value === '') {
			searchResults = [...$seals]
			return
		}

		const results: SealData[] = []
		$seals.forEach((seal) => {
			if (seal.name.includes(value) || choseongIncludes(seal.name, value)) {
				results.push(seal)
			}
		})
		searchResults = [...results]
	}
</script>

<form on:submit={onSubmit} class="flex flex-col items-start gap-4">
	<Input
		label="검색"
		name="search"
		maxlength={30}
		placeholder="씰이름을 입력하세요"
		on:input={onSearchInput}
	/>
	<SealList
		seals={searchResults}
		let:seal
		selectedSealName={form.seal?.name}
		onClickSeal={selectSeal}
	>
		<SealItem {seal} />
	</SealList>
	<Input
		pattern="\d*"
		label="개수"
		name="count"
		maxlength={4}
		bind:value={form.count}
	/>
	<button type="submit" class="variant-filled-primary btn">추가</button>
</form>
