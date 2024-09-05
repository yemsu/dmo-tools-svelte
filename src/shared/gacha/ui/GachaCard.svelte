<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import { gachaStore } from '$entities/gacha'
	import imgViewItemsHover from '$lib/images/gacha/view-items-hover.jpg'
	import imgViewItems from '$lib/images/gacha/view-items.jpg'
	import { cn } from '$shared/lib'
	import {
		GachaSelectButton,
		ProbabilityPopup,
		GachaStartButton
	} from '$shared/gacha'
	import { createEventDispatcher } from 'svelte'

	export let gachaData: GachaData
	export let isActive: boolean

	const dispatch = createEventDispatcher()

	$: isActive && gachaStore.selectGacha(gachaData)
</script>

<div>
	<div
		class={cn(
			'w-[152px] rounded-md border transition-all',
			$gachaStore.currentGacha?.id === gachaData.id
				? 'bg-gacha-card-selected neon-gacha-gold scale-[1.1] border-gacha-gold text-[#E6E1CE]'
				: 'bg-gacha-card border-transparent md:hover:-translate-y-2'
		)}
	>
		<GachaSelectButton {gachaData} />
		<div class="flex p-2">
			<button
				class="group ml-auto"
				on:click={() => dispatch('showProbability', gachaData)}
				title="보상 자세히 보기"
			>
				<img
					src={imgViewItems}
					alt=""
					width="25"
					height="25"
					class="group-hover:hidden"
				/>
				<img
					src={imgViewItemsHover}
					alt=""
					width="25"
					height="25"
					class="hidden group-hover:block"
				/>
			</button>
		</div>
	</div>
	<div class="flex-center -ml-[5%] mt-8 w-[110%] gap-[10%]">
		{#if $gachaStore.currentGacha?.id === gachaData.id}
			<GachaStartButton count={1} on:start={() => dispatch('start')} />
			<GachaStartButton count={10} on:start={() => dispatch('start')} />
		{/if}
	</div>
</div>
