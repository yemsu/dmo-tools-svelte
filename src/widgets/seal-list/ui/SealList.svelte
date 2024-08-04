<script lang="ts">
	import type { SealData } from '$entities/seals'

	export let seals: SealData[] = []
	export let selectedSealName: SealData['name'] | undefined
	export let onClickSeal: (seal: SealData) => void
</script>

{#if seals.length === 0}
	<p>waiting for the promise to resolve...</p>
{:else}
	<menu
		class="scroll-box w-fullgap-2 grid h-[500px] grid-cols-5 items-start gap-2 text-xs"
	>
		{#each seals as seal (seal.id)}
			<li>
				<button
					type="button"
					class="size-full {seal.name === selectedSealName
						? 'variant-filled-secondary'
						: 'variant-outline-primary'}"
					on:click={() => onClickSeal(seal)}
					title="선택하기"
				>
					<slot {seal}></slot>
				</button>
			</li>
		{/each}
	</menu>
{/if}
