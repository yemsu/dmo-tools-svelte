<script lang="ts">
	type T = $$Generic
	export let infoItems: (T & { id: number })[]
</script>

<ul class="w-full rounded-md bg-gray-800 text-sm md:text-md">
	{#each infoItems as infoItemData (infoItemData.id)}
		<li
			class="flex min-h-[50px] items-center gap-4 border-b border-gray-700/60 px-4 py-2 last:border-transparent"
		>
			<slot {infoItemData}></slot>
		</li>
	{/each}
</ul>
