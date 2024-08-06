<script lang="ts">
	import { sealPrices } from '$entities/seals'

	export let sealId: number
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
</script>

{#if price}
	<p class="inline-flex items-end justify-center gap-[0.2em]">
		<span>{price.toFixed(3).toLocaleString()}</span>
		<span class="text-[10px] font-bold text-secondary-50">M</span>
	</p>
{:else}
	<p class="text-secondary-50">???</p>
{/if}
