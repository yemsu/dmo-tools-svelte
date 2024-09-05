<script lang="ts">
	import { GachaItemImage } from '$shared/gacha'
	import BestItemGlowImage from '$lib/images/gacha/best-item-glow-1.png'
	import { gachaStore, type GachaItemData } from '$entities/gacha'
	import { cn } from '$shared/lib'

	export let id: GachaItemData['id']
	$: isBestItem = $gachaStore.currentGacha?.gachaItems[0].item.id === id
</script>

<span class={cn('relative', isBestItem && 'z-10')}>
	{#if isBestItem}
		<img
			src={BestItemGlowImage}
			alt=""
			class="position-center animation-flare -z-[1] aspect-square w-[430%] max-w-none"
			width="220"
			height="220"
		/>
	{/if}
	<GachaItemImage
		{id}
		class={cn('sm:w-[40px]', isBestItem && 'neon-best-item')}
	/>
</span>
