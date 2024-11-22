<script lang="ts">
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	const { class: className, restProps } = $$restProps

	type T = $$Generic
	export let seals: T[] = []
	export let isLoading: boolean = false
	export let noDataText: string | undefined = undefined
	const wrapClassName = cn(
		'grid items-start land:grid-cols-5 grid-cols-3 gap-1 land:gap-2',
		'w-full text-sub-md',
		className
	)
</script>

{#if isLoading}
	<div class={wrapClassName} {...restProps}>
		{#each new Array(35).fill(1) as _}
			<div class="h-[96px] rounded-sm bg-gray-3"></div>
		{/each}
	</div>
{:else if seals.length === 0 && noDataText}
	<NoData>{noDataText}</NoData>
{:else}
	<div class={wrapClassName} {...restProps}>
		{#each seals as seal}
			<slot {seal}></slot>
		{/each}
	</div>
{/if}
