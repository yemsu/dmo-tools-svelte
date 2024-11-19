<script lang="ts">
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	const { class: className, restProps } = $$restProps

	type T = $$Generic
	export let seals: T[] = []
	export let isLoading: boolean = false
	export let noDataText: string | undefined = undefined
	const wrapClassName = cn(
		'grid items-start md:grid-cols-5 grid-cols-3 gap-1 md:gap-2',
		'w-full',
		'scroll-box text-sub-md',
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
			<div class="bg-primary-10 transition-opacity">
				<slot {seal}></slot>
			</div>
		{/each}
	</div>
{/if}
