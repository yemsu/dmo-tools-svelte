<script lang="ts">
	import type { SealData } from '$entities/seals'
	const { class: className, restProps } = $$restProps
	export let seals: SealData[] = []
	export let selectedSealId: SealData['id'] | undefined

	const wrapClassName = `scroll-box w-full gap-2 grid h-[400px] md:h-full grid-cols-5 items-start gap-2 text-xs ${className}`
</script>

{#if seals.length === 0}
	<div class={wrapClassName} {...restProps}>
		{#each new Array(25).fill(1) as _}
			<div class="h-[92px] rounded-sm bg-gray-800"></div>
		{/each}
	</div>
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
