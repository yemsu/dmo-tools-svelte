<script lang="ts">
	import { page } from '$app/stores'
	import { gachaStore } from '$entities/gacha'
	import videoGachaBg from '$lib/images/gacha/videos/gacha-bg.mp4'
	import {
		GachaResultView,
		GachaTitle,
		GachaCard,
		GachaResultLoading
	} from '$widgets/gacha'
	import InventoryButton from '$widgets/gacha/ui/inventory/InventoryButton.svelte'

	let isLoadingOn = false
	let isResultVisible = false

	const endLoadingVideo = () => {
		isLoadingOn = false
	}

	const onResultViewConfirm = () => {
		isResultVisible = false
		gachaStore.setResults([])
	}

	$: startLoading = () => {
		if ($gachaStore.results.length === 0) return
		isLoadingOn = true
		isResultVisible = false
		setTimeout(() => {
			isResultVisible = true
		}, 100)
	}
</script>

<section
	class="bg-gacha relative flex h-full flex-col justify-center font-ns text-gray-200"
>
	<div class="relative">
		<video src={videoGachaBg} autoplay loop muted>
			<track kind="captions" />
		</video>
		{#if !isResultVisible}
			<div
				class="flex-col-center absolute top-1/2 w-full -translate-y-1/2 gap-10"
			>
				<GachaTitle class="max-w-[500px]"
					>소환할 데이터를 선택하세요.</GachaTitle
				>
				<div class="flex gap-10">
					{#each $page.data.gachaList as gachaData (gachaData.id)}
						<GachaCard {gachaData} on:start={startLoading} />
					{/each}
				</div>
			</div>
		{/if}
		<InventoryButton />
	</div>
	{#if isResultVisible}
		<GachaResultView on:confirm={onResultViewConfirm} on:start={startLoading} />
	{/if}
	{#if isLoadingOn}
		<GachaResultLoading on:endVideo={endLoadingVideo} />
	{/if}
</section>
