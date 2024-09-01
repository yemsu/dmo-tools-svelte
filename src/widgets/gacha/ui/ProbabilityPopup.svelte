<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import GachaItemImage from '$widgets/gacha/ui/GachaItemImage.svelte'
	import { GachaPopup } from '$widgets/gacha'
	import { createEventDispatcher } from 'svelte'

	export let gachaType: string
	export let gachaData: GachaData

	const dispatch = createEventDispatcher()

	const closePopup = () => {
		dispatch('close')
	}
</script>

<GachaPopup
	on:close={closePopup}
	class="bg-gacha-popup flex flex-col gap-1 px-2 pb-2 pt-2"
>
	<div class="flex-col-center gap-[0.6em] text-center">
		<h2 class="font-ns-bold text-md text-[yellow] md:text-lg2">확률 정보</h2>
		<div class="text-xs2 md:text-sm">
			<p>{gachaType}</p>
			<p>{gachaData.name}</p>
		</div>
	</div>
	<section class="flex flex-1 flex-col items-start overflow-hidden">
		<h3
			class="border-t-2 border-[#E9B305] bg-[#201E1E] px-4 py-[0.5em] text-xs3 text-[yellow] md:text-xs2"
		>
			랜덤 소환 목록
		</h3>
		<div class="flex w-full flex-1 overflow-hidden bg-[#201E1E] py-2">
			<ul class="scroll-box flex flex-1 flex-col">
				{#each gachaData.gachaItems as gachaResult (gachaResult.id)}
					<li class="flex items-center gap-[1em] px-3 text-xs2 md:text-xs">
						<GachaItemImage
							id={gachaResult.item.id}
							class="w-[30px] md:w-[35px]"
						/>
						<h3 class="flex-1">{gachaResult.item.name}</h3>
						<span class="text-[#E8C590]">{gachaResult.probability}%</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</GachaPopup>
