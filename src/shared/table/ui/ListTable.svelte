<script lang="ts">
	import { cn } from '$shared/lib'

	type T = $$Generic
	export let infoItems: (T & { id: number })[]
	export let listClassName: string = ''
</script>

<ul class="w-full rounded-md bg-gray-800 text-sm md:text-md">
	{#each infoItems as infoItemData (infoItemData.id)}
		<li
			class={cn(
				'flex min-h-[50px] items-center border-b border-gray-700/60 px-4 py-2 last:border-transparent',
				listClassName
			)}
		>
			<slot {infoItemData}></slot>
		</li>
	{/each}
</ul>
