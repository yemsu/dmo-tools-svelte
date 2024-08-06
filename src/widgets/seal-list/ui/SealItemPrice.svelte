<script lang="ts">
	import { sealPrices } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'

	export let sealId: number
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
</script>

{#if price}
	<p
		class="inline-flex flex-1 items-end justify-center gap-[0.2em] md:flex-auto"
	>
		<span>{numberFormatter(price, 3)}</span>
		<span class="text-[10px] font-bold text-secondary-50">M</span>
	</p>
{:else}
	<p class="flex-1 text-center text-secondary-50 md:flex-auto">???</p>
{/if}
