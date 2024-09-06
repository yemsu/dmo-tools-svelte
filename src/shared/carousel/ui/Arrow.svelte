<script lang="ts">
	import { cn } from '$shared/lib'
	import { createEventDispatcher } from 'svelte'

	type Direction = 'prev' | 'next'

	export let dir: Direction
	const dispatch = createEventDispatcher<{ toDir: Direction }>()

	const directionStyles = {
		prev: 'left-0 px-5',
		next: 'right-0 px-5 justify-end'
	}

	const arrowStyles = ['brightness-100', 'brightness-125', 'brightness-150']
</script>

<button
	class="group absolute top-0 flex h-full items-center {directionStyles[
		dir
	]} pb-10"
	on:click={() => dispatch('toDir', dir)}
	{...$$restProps}
>
	<span class="flex">
		{#each new Array(3).fill(null) as _, i}
			<span class="flex-center w-[12px] overflow-hidden">
				<iconify-icon
					icon="ic:outline-chevron-{dir === 'prev' ? 'left' : 'right'}"
					width="2.9em"
					height="2.9em"
					class={cn(
						'text-[#10346B] group-disabled:text-[#2E2F2F]',
						arrowStyles[dir === 'prev' ? 2 - i : i]
					)}
				/>
			</span>
		{/each}
	</span>
</button>
