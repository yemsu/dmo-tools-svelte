<script lang="ts">
	import type { SealData } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	const { class: className, restProps } = $$restProps
	export let seals: SealData[] = []
	export let isLoading: boolean = true
	export let selectedSealId: SealData['id'] | undefined

	const wrapClassName = cn(
		'grid grid-cols-5 grid-rows-[repeat(auto-fill,92px)] gap-2 items-start',
		'w-full h-[400px] md:h-full',
		'scroll-box text-xs',
		className
	)
</script>

{#if isLoading}
	<div class={wrapClassName} {...restProps}>
		{#each new Array(35).fill(1) as _}
			<div class="h-[92px] rounded-sm bg-gray-800"></div>
		{/each}
	</div>
{:else if seals.length === 0}
	<NoData>검색 결과가 존재하지 않습니다.</NoData>
{:else}
	<ul class={wrapClassName} {...restProps}>
		{#each seals as seal (seal.id)}
			<li
				class="transition-opacity {selectedSealId &&
					(selectedSealId !== seal.id ? 'opacity-50' : '')}"
			>
				<slot {seal}></slot>
			</li>
		{/each}
	</ul>
{/if}
