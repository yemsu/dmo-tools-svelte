<script lang="ts">
	import {
		GACHA_TYPES,
		gachaStore,
		isLoadingVideoOn,
		type GachaData,
		type GachaDataType,
		type GachaTabContents
	} from '$entities/gacha'
	import { _objKeys } from '$shared/lib'
	import { lang } from '$shared/model'
	import { GachaList, GachaResultView, InventoryButton } from '$features/gacha'
	import { onMount } from 'svelte'

	export let currentGachaType: GachaDataType
	export let gachaTabContent: GachaTabContents[GachaDataType]
	$: activeGacha = gachaTabContent.gachaList[0]

	$: onResultViewConfirm = () => {
		gachaStore.setResultShow(false)
		gachaStore.setResults(currentGachaType, [])
	}

	$: startLoading = () => {
		if ($gachaStore.results.length === 0) return
		isLoadingVideoOn.set(true)
		gachaStore.setResultShow(false)
		setTimeout(() => {
			gachaStore.setResultShow(true)
		}, 100)
	}

	const selectGacha = (event: CustomEvent<GachaData>) => {
		activeGacha = event.detail
	}

	onMount(() => {
		window.addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
			let hasInventoryData = false
			_objKeys(GACHA_TYPES).forEach((gachaType) => {
				if ($gachaStore.inventory[gachaType].length > 0) {
					hasInventoryData = true
				}
			})
			if (hasInventoryData) {
				event.preventDefault()
				event.returnValue = '' //for chrome
			}
		})
	})
</script>

<div class="w-full">
	<GachaList
		{currentGachaType}
		{activeGacha}
		title={gachaTabContent.title[$lang]}
		gachaList={gachaTabContent.gachaList}
		on:select={selectGacha}
		on:start={startLoading}
	/>
	<InventoryButton {currentGachaType} gachaList={gachaTabContent.gachaList} />
	{#if $gachaStore.isResultShow}
		<GachaResultView
			{currentGachaType}
			{activeGacha}
			on:confirm={onResultViewConfirm}
			on:start={startLoading}
		/>
	{/if}
</div>
