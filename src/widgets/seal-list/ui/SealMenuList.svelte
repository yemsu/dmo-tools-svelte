<script lang="ts">
	import type { SealData } from '$entities/seals'

	export let seals: SealData[] = []
	export let selectedSealName: SealData['name'] | undefined
	export let onClickSeal: (seal: SealData) => void | undefined
</script>

{#if seals.length === 0}
	<p>waiting for the promise to resolve...</p>
{:else}
	<menu
		class="scroll-box w-fullgap-2 grid max-h-[500px] grid-cols-5 items-start gap-2 text-xs"
	>
		{#each seals as seal (seal.id)}
			<li
				class="transition-opacity {selectedSealName &&
					(selectedSealName !== seal.name ? 'opacity-50' : '')}"
			>
				<button
					type="button"
					class="block size-full"
					on:click={() => onClickSeal(seal)}
					title="선택하기"
				>
					<slot {seal}></slot>
				</button>
			</li>
		{/each}
	</menu>
{/if}
