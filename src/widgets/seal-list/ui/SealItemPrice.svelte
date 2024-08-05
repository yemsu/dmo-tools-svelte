<script lang="ts">
	import { sealPrices } from '$entities/seals'

	export let sealId: number
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
</script>

{#if price}
	<span class="inline-flex items-end justify-center gap-[0.2em]">
		<span>{price.toLocaleString()}</span>
		<span class="text-[10px] font-bold text-secondary-50">M</span>
	</span>
{:else}
	<span class="text-secondary-50">???</span>
{/if}
