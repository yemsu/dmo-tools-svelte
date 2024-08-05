<script lang="ts">
	import { sealPrices } from '$entities/seals'

	export let sealId: number
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
</script>

{#if price}
	<span>{price.toLocaleString()}M</span>
{:else}
	<span><span class="text-gray-400">??</span> M</span>
{/if}
