<script lang="ts">
	import type { SealData } from '$entities/seals'

	export let seals: SealData[] = []
	export let selectedSealId: SealData['id'] | undefined
</script>

{#if seals.length === 0}
	<div
		class="scroll-box w-fullgap-2 grid max-h-[500px] grid-cols-3 items-start gap-2 text-xs sm:grid-cols-5"
	>
		{#each new Array(25).fill(1) as _}
			<div class="h-[92px] rounded-sm bg-gray-800"></div>
		{/each}
	</div>
{:else}
	<ul
		class="scroll-box w-fullgap-2 grid max-h-[500px] grid-cols-3 items-start gap-2 text-xs sm:grid-cols-5"
	>
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
