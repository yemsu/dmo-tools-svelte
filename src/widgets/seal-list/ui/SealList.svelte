<script lang="ts">
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	const { class: className, restProps } = $$restProps

	type T = $$Generic
	export let seals: T[] = []
	export let isLoading: boolean = false
	export let noDataText: string

	const wrapClassName = cn(
		'flex items-start flex-wrap',
		'w-full md:h-full -ml-1',
		'scroll-box text-xs',
		className
	)
	const listItemClassName = 'w-[20%] shrink-0'
</script>

{#if isLoading}
	<div class="gap-2 {wrapClassName}" {...restProps}>
		{#each new Array(35).fill(1) as _}
			<div class="h-[96px] rounded-sm bg-gray-800 {listItemClassName}"></div>
		{/each}
	</div>
{:else if seals.length === 0}
	<NoData>{noDataText} 검색 결과가 존재하지 않습니다.</NoData>
{:else}
	<ul class="gap-y-2 {wrapClassName}" {...restProps}>
		{#each seals as seal}
			<li class="px-1 transition-opacity {listItemClassName}">
				<slot {seal}></slot>
			</li>
		{/each}
	</ul>
{/if}
