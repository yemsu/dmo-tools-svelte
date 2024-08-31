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

	let isLoadingOn = false
	let isResultVisible = false

	const endLoadingVideo = () => {
		console.log('endLoadingVideo', endLoadingVideo)
		isLoadingOn = false
	}

	const onResultViewConfirm = () => {
		isResultVisible = false
		gachaStore.setGachaResults([])
	}

	$: startLoading = () => {
		if ($gachaStore.gachaResults.length === 0) return
		console.log('startLoading', $gachaStore.gachaResults)
		isLoadingOn = true
		isResultVisible = false
		setTimeout(() => {
			isResultVisible = true
		}, 100)
	}

	$: $gachaStore.gachaResults && startLoading()
</script>

<section
	class="bg-gacha relative flex h-full flex-col items-center justify-center font-ns text-gray-200"
>
	<div class=" w-full">
		<video src={videoGachaBg} autoplay loop muted>
			<track kind="captions" />
		</video>
	</div>
	{#if !isResultVisible}
		<div
			class="flex-col-center absolute top-1/2 w-full max-w-[500px] -translate-y-1/2 gap-10"
		>
			<GachaTitle>소환할 데이터를 선택하세요.</GachaTitle>
			<div>
				<div class="flex gap-10">
					{#each $page.data.gachaList as gachaData (gachaData.id)}
						<GachaCard {gachaData} />
					{/each}
				</div>
				<!-- <div class="mt-4 flex w-full">
				<button class="ml-auto" title="인벤토리 열기">
					<img src={imgInven} alt="" />
				</button>
			</div> -->
			</div>
		</div>
	{/if}
	{#if isResultVisible}
		<GachaResultView on:confirm={onResultViewConfirm} />
	{/if}
	{#if isLoadingOn}
		<GachaResultLoading on:endVideo={endLoadingVideo} />
	{/if}
</section>
