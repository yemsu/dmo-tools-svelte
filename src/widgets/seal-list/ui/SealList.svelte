<script lang="ts">
	import { NoData } from '$shared/text'

	type T = $$Generic
	export let seals: T[] = []
</script>

{#if seals.length === 0}
	<NoData>목표 수치를 입력하여 가장 효율적인 씰 구성을 확인해보세요!</NoData>
{:else}
	<ul
		class="scroll-box w-fullgap-2 grid max-h-[500px] grid-cols-5 grid-rows-[auto-fill_92px] items-stretch gap-2 text-xs"
	>
		{#each seals as seal}
			<li class="relative">
				<slot {seal}></slot>
			</li>
		{/each}
	</ul>
{/if}
