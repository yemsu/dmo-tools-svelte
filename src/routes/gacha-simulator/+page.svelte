<script lang="ts">
	import { page } from '$app/stores'
	import videoGachaBg from '$lib/images/gacha/gacha-bg.mp4'
	import { GachaTitle } from '$widgets/gacha'
	import GachaCard from '$widgets/gacha/ui/GachaCard.svelte'
</script>

<section
	class="bg-gacha relative flex h-full flex-col items-center justify-center font-ns text-gray-200"
>
	<div class=" w-full">
		<video src={videoGachaBg} autoplay loop muted>
			<track kind="captions" />
		</video>
	</div>
	<div
		class="flex-col-center absolute top-1/2 w-full max-w-[500px] -translate-y-1/2 gap-10 pb-8"
	>
		<GachaTitle>소환할 데이터를 선택하세요.</GachaTitle>
		<div>
			<div class="flex gap-6">
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
</section>
