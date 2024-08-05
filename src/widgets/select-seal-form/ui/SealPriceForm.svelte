<script lang="ts">
	import { seals, type SealData } from '$entities/seals'
	import { postSealPrice } from '$entities/seals/api'
	import { mySealPrices, mySeals, sealPrices } from '$entities/seals/model'
	import { Input } from '$shared/form'
	import { SealItem } from '$widgets/seal-list'
	import SealMenuList from '$widgets/seal-list/ui/SealMenuList.svelte'
	import {
		STAT_TYPES,
		statColorStyles,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { choseongIncludes } from 'es-hangul'

	type Form = {
		[key: number]: SealData & { price: number | '' }
	}

	const defaultForm = {}

	export let saveMySealPrices: () => void
	let form: Form = defaultForm
	let statCheckboxes: Record<StatType, boolean> = {
		AT: true,
		HT: true,
		CT: true
	}
	let searchText = ''
	$: searchResults = $seals
	let inputElement: HTMLInputElement

	const getSealPrice = (sealId: number) => {
		return $sealPrices.find(({ sealId: _sealId }) => _sealId === sealId)
	}

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

	const newPriceForm = (price: number) => {
		const sealId = +Object.keys(form)[0]
		const formValue = Object.values(form)[0]
		if (`${price}`.startsWith('0')) {
			price = +`${price}`.replace(/^0+/g, '')
		}
		return { [sealId]: { ...formValue, price } }
	}

	const onPriceInput = (e: Event) => {
		const target = e.target as HTMLInputElement
		const { value } = target
		form = { ...newPriceForm(+value) }
	}

	const getMySeal = (_sealId: number) => {
		return $mySeals.find(({ sealId }) => sealId === _sealId)
	}

	const clickSeal = (selectedSeal: SealData) => {
		const sealId = selectedSeal.id
		const price = getSealPrice(sealId)?.price || ''
		form = { [sealId]: { ...selectedSeal, price } }
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const onblur = () => {
		form = {}
	}

	$: onSubmit = async () => {
		const sealId = +Object.keys(form)[0]
		const formValue = Object.values(form)[0]
		console.log('formValue', formValue)
		if (!formValue.name) {
			alert('보유 중인 씰을 선택해주세요.')
			return
		}
		if (!formValue.price) {
			alert('씰의 가격을 입력해주세요.')
			return
		}
		const newSealPrice = await postSealPrice(sealId, formValue.price)
		console.log('newSealPrice', newSealPrice)
		const newSealPrices = $sealPrices.map((sealPrice) =>
			sealPrice.sealId === sealId ? newSealPrice : sealPrice
		)
		sealPrices.set([...newSealPrices])
		mySealPrices.set([...$mySealPrices, newSealPrice])
		saveMySealPrices()
		form = {}
	}
</script>

<div class="flex flex-col gap-4">
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
	<div class="flex">
		<button class="variant-filled-primary py-1 text-xs"
			>최신 가격 일괄 적용</button
		>
		<button class="variant-filled-primary text-xs"
			>많이 입력된 가격 일괄 적용</button
		>
	</div>
	<form on:submit|preventDefault={onSubmit} class="w-full">
		<SealMenuList
			seals={searchResults}
			let:seal
			selectedSealId={Object.values(form)[0]?.id}
		>
			{#if $sealPrices.length > 0}
				<SealItem {seal} />
			{/if}
			{#if form[seal.id]}
				<span class="flex items-center justify-center gap-1 bg-primary-10">
					<span class="w-[4em] overflow-hidden">
						<input
							bind:this={inputElement}
							type="number"
							id={`price-${seal.id}`}
							class="w-full bg-primary-20 p-1 text-xs text-white"
							placeholder="씰 개수"
							step="0.1"
							bind:value={form[seal.id].price}
							on:input={onPriceInput}
							on:blur|once={onblur}
						/>
					</span>
					<span>M</span>
				</span>
			{/if}
		</SealMenuList>
	</form>
</div>
