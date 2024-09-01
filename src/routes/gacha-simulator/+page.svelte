<script lang="ts">
	import { page } from '$app/stores'
	import { gachaStore } from '$entities/gacha'
	import videoGachaBg from '$lib/images/gacha/videos/gacha-bg.mp4'
	import { META } from '$shared/config'
	import {
		GachaCard,
		GachaResultLoading,
		GachaResultView,
		GachaTitle
	} from '$widgets/gacha'
	import InventoryButton from '$widgets/gacha/ui/inventory/InventoryButton.svelte'
	import { onMount } from 'svelte'

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

	onMount(() => {
		window.addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
			if ($gachaStore.inventory.length > 0) {
				event.preventDefault()
				event.returnValue = '' //for chrome
			}
		})
	})
</script>

<svelte:head>
	<title>{META.GACHA_SIMULATOR.TITLE}</title>
	<meta name="description" content={META.GACHA_SIMULATOR.DESC} />
</svelte:head>

<section
	class="bg-gacha relative flex h-full flex-col justify-center font-ns text-gray-200 sm:px-content-side"
>
	<h2 class="ir">뽑기 시뮬레이터</h2>
	<section>
		<div class="relative">
			<div class="flex-center">
				<video
					src={videoGachaBg}
					autoplay
					loop
					muted
					class="h-[450px] w-[798px] max-w-none"
				>
					<track kind="captions" />
				</video>
			</div>
			{#if !isResultVisible}
				<div
					class="flex-col-center absolute top-1/2 z-20 w-full -translate-y-1/2 gap-10"
				>
					<GachaTitle class="max-w-[500px]">
						소환할 데이터를 선택하세요.
					</GachaTitle>
					<section class="flex gap-5 md:gap-10">
						{#each $page.data.gachaList as gachaData (gachaData.id)}
							<GachaCard {gachaData} on:start={startLoading} />
						{/each}
					</section>
				</div>
			{/if}
			<InventoryButton />
		</div>
		{#if isResultVisible}
			<GachaResultView
				on:confirm={onResultViewConfirm}
				on:start={startLoading}
			/>
		{/if}
		{#if isLoadingOn}
			<GachaResultLoading on:endVideo={endLoadingVideo} />
		{/if}
	</section>
</section>
