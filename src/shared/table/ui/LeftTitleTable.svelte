<script lang="ts">
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import type { LeftTitleTableData } from '$shared/table/types'

	type T = $$Generic
	export let infoItems: (T & LeftTitleTableData)[]
</script>

<dl class="w-full rounded-md bg-gray-3 text-sm md:text-body-md">
	{#each infoItems as infoItemData (infoItemData.title)}
		<div
			class="flex min-h-[50px] items-center gap-4 border-b border-gray-5/60 px-4 py-2 last:border-transparent"
		>
			<dt class="w-[70px] break-keep font-semibold md:w-[100px]">
				<TextByLang data={infoItemData} dataKey={['title', 'engTitle']} />
			</dt>
			<dd class="flex flex-1 items-center gap-4">
				<slot {infoItemData}></slot>
			</dd>
		</div>
	{/each}
</dl>
