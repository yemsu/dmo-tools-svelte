<script lang="ts">
	import { seals, mySeals, myStats } from '$entities/seals/model'
	import { Section } from '$shared/section'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import { STATS } from '$widgets/select-seal-form/config'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'

	export let saveMySeals: () => void
</script>

<Section>
	<h2 class="mb-4 text-lg font-bold">보유중인 씰 ({$mySeals.length})</h2>
	<SealList seals={$mySeals} let:seal={mySeal}>
		<SealItem
			seal={getMySealData($seals, mySeal.sealId)}
			count={'count' in mySeal ? mySeal.count : undefined}
		/>
		<button
			class="absolute right-[1px] top-[1px]"
			on:click={() => {
				mySeals.remove(mySeal.sealId)
				saveMySeals()
			}}
			title="삭제"
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealList>
	<div class="flex items-center gap-2 border-t border-gray-700 pt-4 sm:gap-4">
		<h3 class="shrink-0 font-bold">능력치</h3>
		<dl class="flex flex-wrap gap-1 sm:gap-2">
			{#each STATS as stat (stat.type)}
				<div
					class="sm:text-md flex gap-1 rounded-full bg-gray-800 px-3 py-1 text-sm sm:gap-2"
				>
					<dt>{stat.name}</dt>
					<dd>{$myStats[stat.type]}</dd>
				</div>
			{/each}
		</dl>
	</div>
</Section>
