<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { TextByLang } from '$shared/text'
	import type { LeftTitleTableData } from '$shared/table/types'

	export let infoItems: LeftTitleTableData[]
</script>

<dl class="w-full rounded-md bg-gray-3 text-body-sm land:text-body-md">
	{#each infoItems as infoItemData (infoItemData.i18n)}
		<div
			class="flex min-h-[45px] items-center gap-4 border-b border-gray-5/60 px-4 py-2 last:border-transparent"
		>
			<dt class="w-[70px] break-keep font-semibold land:w-[100px]">
				{$_(infoItemData.i18n)}
			</dt>
			<dd class="flex flex-1 items-center gap-4">
				<slot {infoItemData}></slot>
			</dd>
		</div>
	{/each}
</dl>
