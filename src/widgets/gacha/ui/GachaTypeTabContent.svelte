<script lang="ts">
	import {
		GACHA_TYPES,
		gachaStore,
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

	export let activeGachaType: GachaDataType
	export let gachaTabContent: GachaTabContents[GachaDataType]
	let isLoadingOn = false

	const endLoadingVideo = () => {
		isLoadingOn = false
	}

	const onResultViewConfirm = () => {
		gachaStore.setResultShow(false)
		gachaStore.setResults(activeGachaType, [])
	}

	$: startLoading = () => {
		if ($gachaStore.results.length === 0) return
		isLoadingOn = true
		gachaStore.setResultShow(false)
		setTimeout(() => {
			gachaStore.setResultShow(true)
		}, 100)
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

<GachaList
	{activeGachaType}
	title={gachaTabContent.title}
	gachaList={gachaTabContent.gachaList}
	on:start={startLoading}
/>
<InventoryButton {activeGachaType} gachaList={gachaTabContent.gachaList} />
{#if $gachaStore.isResultShow}
	<GachaResultView
		{activeGachaType}
		on:confirm={onResultViewConfirm}
		on:start={startLoading}
	/>
{/if}
{#if isLoadingOn}
	<GachaResultLoading on:endVideo={endLoadingVideo} />
{/if}
