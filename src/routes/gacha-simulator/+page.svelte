<script lang="ts">
	import { page } from '$app/stores'
	import { gachaStore } from '$entities/gacha'
	import videoGachaBg from '$lib/images/gacha/videos/gacha-bg.mp4'
	import { META } from '$shared/config'
	import { Section } from '$shared/section'
	import {
		GachaResultView,
		GachaTitle,
		GachaCard,
		GachaResultLoading
	} from '$widgets/gacha'
	import InventoryButton from '$widgets/gacha/ui/inventory/InventoryButton.svelte'
	import { onDestroy, onMount } from 'svelte'

	let isLoadingOn = false
	let isResultVisible = false
	let isMobile: boolean | null = null

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

	const checkMobile = () => {
		console.log('checkMobile')
		isMobile = window.innerWidth <= 530
	}

	onMount(() => {
		checkMobile()
		window.addEventListener('resize', checkMobile)

		window.addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
			if ($gachaStore.inventory.length > 0) {
				event.preventDefault()
				event.returnValue = '' //for chrome
			}
		})
	})

	onDestroy(() => {
		if (import.meta.env.SSR) return
		window.removeEventListener('resize', checkMobile)
	})
</script>

<svelte:head>
	<title>{META.GACHA_SIMULATOR.TITLE}</title>
	<meta name="description" content={META.GACHA_SIMULATOR.DESC} />
</svelte:head>

{#if !isMobile}
	<section
		class="bg-gacha relative flex h-full flex-col justify-center font-ns text-gray-200"
	>
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
					class="flex-col-center absolute top-1/2 w-full -translate-y-1/2 gap-10"
				>
					<GachaTitle class="max-w-[500px]">
						소환할 데이터를 선택하세요.
					</GachaTitle>
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
			<GachaResultView
				on:confirm={onResultViewConfirm}
				on:start={startLoading}
			/>
		{/if}
		{#if isLoadingOn}
			<GachaResultLoading on:endVideo={endLoadingVideo} />
		{/if}
	</section>
{:else}
	<Section size="sm" class="text-center">
		<p class="text-[50px]">🏄🏿‍♂️</p>
		<p>모바일은 작업 중 이예요. <br />조금만 기다려주세요!</p>
	</Section>
{/if}
