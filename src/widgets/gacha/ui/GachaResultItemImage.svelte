<script lang="ts">
	import {
		type GachaData,
		type GachaDataType,
		type GachaItemData
	} from '$entities/gacha'
	import { GachaItemImage } from '$shared/gacha'
	import { cn, contentUrl } from '$shared/lib'

	export let id: GachaItemData['id']
	export let activeGacha: GachaData
	export let currentGachaType: GachaDataType

	$: rareItems = activeGacha.gachaItems.map((item) =>
		item.rarity === 7 ? item.item.id : undefined
	)
	$: isBestItem = currentGachaType !== 'DIGITAL_DRAW' && rareItems.includes(id)
</script>

<span class={cn('relative', isBestItem && 'z-10')}>
	{#if isBestItem}
		<img
			src={contentUrl('/gacha/best-item-glow-1.png')}
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
