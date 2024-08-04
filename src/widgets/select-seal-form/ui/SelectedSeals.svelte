<script lang="ts">
	import { mySeals } from '$entities/seals/model'
	import { objectBy } from '$shared/lib'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import {
		commonStatTable,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'

	$: mySealsByStatType = objectBy($mySeals, (mySeal) => mySeal.statType)

	$: statCalc = (statType: StatType) => {
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ maxIncrease, count }) => {
			let sealPercent = 0
			for (const statTable of commonStatTable) {
				if (count <= statTable.sealCount) {
					sealPercent = statTable.percent
					break
				}
			}
			resultValue += maxIncrease * (sealPercent / 100)
		})
		return resultValue
	}
</script>

<section class="rounded-md border border-gray-600 p-4">
	<h2 class="mb-4 text-lg font-bold">보유중인 씰 ({$mySeals.length})</h2>
	<SealList seals={$mySeals} let:seal={mySeal}>
		<SealItem
			seal={mySeal}
			count={'count' in mySeal ? mySeal.count : undefined}
		/>
		<button
			class="absolute right-[1px] top-[1px]"
			on:click={() => mySeals.remove(mySeal.name)}
			title="삭제"
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealList>
	<div class="flex items-center gap-4 border-t border-gray-700 pt-4">
		<h3 class="font-bold">능력치</h3>
		<dl class="flex gap-2">
			{#each STATS as stat (stat.type)}
				<div class="flex gap-2 rounded-full bg-gray-800 px-3 py-1">
					<dt>{stat.name}</dt>
					<dd>{statCalc(stat.type)}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
