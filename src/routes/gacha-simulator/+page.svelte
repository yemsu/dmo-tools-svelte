<script lang="ts">
	import './gacha.css'
	import { gachaStore } from '$entities/gacha'
	import { META } from '$shared/config'
	import { GachaBg } from '$shared/gacha'
	import {
		GachaResultLoading,
		GachaResultView,
		GachaSelectView,
		GachaTypeTab
	} from '$widgets/gacha'
	import InventoryButton from '$widgets/gacha/ui/inventory/InventoryButton.svelte'
	import { onMount } from 'svelte'
	import { cn } from '$shared/lib'

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
			<GachaBg />
			<div class={cn(isResultVisible && 'opacity-0')}>
				<GachaTypeTab let:gachaList let:title>
					<GachaSelectView {title} {gachaList} on:start={startLoading} />
				</GachaTypeTab>
			</div>
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
