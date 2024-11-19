<script lang="ts">
	import { numberFormatter } from '$shared/lib'

	export let price: number | undefined
</script>

{#if price}
	<span
		class="inline-flex flex-1 items-center justify-center gap-[0.2em] md:flex-auto"
	>
		<span>{numberFormatter(price, 3)}</span>
		<span class="text-sub-md3 font-semibold text-secondary-50">M</span>
	</span>
{:else}
	<span class="flex-1 text-center text-secondary-50 md:flex-auto">???</span>
{/if}
