<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import { GachaPopup, GachaItemImage } from '$features/gacha'
	import { TextByLang } from '$shared/text'
	import { createEventDispatcher } from 'svelte'

	export let gachaData: GachaData

	const dispatch = createEventDispatcher()

	const closePopup = () => {
		dispatch('close')
	}
</script>

<GachaPopup
	on:close={closePopup}
	class="bg-blur-sm flex flex-col gap-1 rounded-md border border-gray-3 bg-background/80 px-2 py-2 land:py-4"
>
	<div class="flex-col-center gap-[0.6em] text-center">
		<h2 class="font-ns-bold text-body-md text-[#ecea56] land:text-title-sm">
			<TextByLang text="확률 정보" engText="Probability Information" />
		</h2>
		<div class="text-sub-md land:text-body-sm">
			{#if gachaData.category}
				<p>
					<TextByLang data={gachaData} dataKey={['category', 'engCategory']} />
				</p>
			{/if}
			<p><TextByLang data={gachaData} /></p>
		</div>
	</div>
	<section class="flex flex-1 flex-col items-start overflow-hidden">
		<h3
			class="border-t-2 border-[#E9B305] bg-[#201E1E] px-4 py-[0.5em] text-sub-md text-[yellow] land:text-sub-lg"
		>
			<TextByLang text="랜덤 소환 목록" engText="Random Summon List" />
		</h3>
		<div class="flex w-full flex-1 overflow-hidden bg-[#201E1E] py-2">
			<ul class="scroll-box flex flex-1 flex-col">
				{#each gachaData.gachaItems as gachaResult (gachaResult.id)}
					<li
						class="flex items-center gap-[1em] px-3 text-sub-md land:text-body-sm"
					>
						<GachaItemImage
							id={gachaResult.item.id}
							class="w-[30px] land:w-[40px]"
							skeletonWidth="w-[30px] land:w-[40px]"
						/>
						<h3 class="flex-1">
							<TextByLang data={gachaResult.item} />
						</h3>
						<span class="text-[#E8C590]">{gachaResult.probability}%</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>
</GachaPopup>
