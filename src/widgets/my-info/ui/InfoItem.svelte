<script lang="ts">
	import type { InfoItemData } from '$widgets/my-info'

	export let infoItems: InfoItemData[]
</script>

<dl class="w-full rounded-md bg-gray-800 text-sm md:text-md">
	{#each infoItems as infoItemData (infoItemData.title)}
		<div
			class="flex min-h-[50px] items-center gap-4 border-b border-gray-700/60 px-4 py-2 last:border-transparent"
		>
			<dt class="w-[70px] break-keep font-semibold md:w-[100px]">
				{infoItemData.title}
			</dt>
			<dd class="flex flex-1 flex-wrap items-center gap-4">
				<slot {infoItemData}></slot>
			</dd>
		</div>
	{/each}
</dl>
