<script lang="ts">
	import { sealPrices } from '$entities/seals'

	export let sealId: number
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
</script>

{#if price}
	<p
		class="inline-flex flex-1 items-end justify-center gap-[0.2em] md:flex-auto"
	>
		<span>{price.toFixed(3).toLocaleString()}</span>
		<span class="text-[10px] font-bold text-secondary-50">M</span>
	</p>
{:else}
	<p class="flex-1 text-center text-secondary-50 md:flex-auto">???</p>
{/if}
