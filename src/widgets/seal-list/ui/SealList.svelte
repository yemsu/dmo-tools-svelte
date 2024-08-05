<script lang="ts">
	type T = $$Generic
	export let seals: T[] = []
</script>

{#if seals.length === 0}
	<p>씰 없음</p>
{:else}
	<ul
		class="scroll-box w-fullgap-2 grid max-h-[500px] grid-cols-5 items-start gap-2 text-xs"
	>
		{#each seals as seal}
			<li class="relative">
				<slot {seal}></slot>
			</li>
		{/each}
	</ul>
{/if}
