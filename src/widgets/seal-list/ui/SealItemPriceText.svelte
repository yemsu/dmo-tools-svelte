<script lang="ts">
	import { numberFormatter } from '$shared/lib'

	export let price: number | undefined
</script>

{#if price}
	<span
		class="inline-flex flex-1 items-center justify-center gap-[0.2em] land:flex-auto"
	>
		<span>{numberFormatter(price, 3)}</span>
		<span class="text-body-sm font-semibold text-gray-8">M</span>
	</span>
{:else}
	<span class="flex-1 text-center text-gray-8 land:flex-auto">???</span>
{/if}
