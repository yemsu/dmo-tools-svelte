<script lang="ts">
	import {
		GACHA_TYPES,
		gachaStore,
		type GachaData,
		type GachaDataType,
		type GachaTabContents
	} from '$entities/gacha'
	import { _objKeys } from '$shared/lib'
	import {
		GachaList,
		GachaResultLoading,
		GachaResultView
	} from '$widgets/gacha'
	import InventoryButton from '$widgets/gacha/ui/inventory/InventoryButton.svelte'
	import { onMount } from 'svelte'

	export let currentGachaType: GachaDataType
	export let gachaTabContent: GachaTabContents[GachaDataType]
	let isLoadingOn = false
	$: activeGacha = gachaTabContent.gachaList[0]

	const endLoadingVideo = () => {
		isLoadingOn = false
	}

	$: onResultViewConfirm = () => {
		gachaStore.setResultShow(false)
		gachaStore.setResults(currentGachaType, [])
	}

	$: startLoading = () => {
		if ($gachaStore.results.length === 0) return
		isLoadingOn = true
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

<div class="w-full md:pb-10">
	<GachaList
		{currentGachaType}
		{activeGacha}
		title={gachaTabContent.title}
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
	{#if isLoadingOn}
		<GachaResultLoading on:endVideo={endLoadingVideo} />
	{/if}
</div>
