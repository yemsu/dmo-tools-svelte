<script lang="ts">
	import { numberFormatter } from '$shared/lib'

	export let price: number | undefined
</script>

{#if price}
	<span
		class="inline-flex flex-1 items-end justify-center gap-[0.2em] md:flex-auto"
	>
		<span>{numberFormatter(price, 3)}</span>
		<span class="text-[10px] font-bold text-secondary-50">M</span>
	</span>
{:else}
	<span class="flex-1 text-center text-secondary-50 md:flex-auto">???</span>
{/if}
