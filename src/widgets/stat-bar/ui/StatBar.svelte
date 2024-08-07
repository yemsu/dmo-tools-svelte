<script lang="ts">
	import type { Stats } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'
	import { STATS } from '$widgets/select-seal-form'
	import { StatBarSeparator, StatBarTotalPrice } from '$widgets/stat-bar'
	import StatBarWrap from '$widgets/stat-bar/ui/StatBarWrap.svelte'

	export let stats: Stats
	export let totalPrice: number
</script>

<StatBarWrap>
	<h3 class="ir">내 능력치</h3>
	<dl>
		<div
			class="flex flex-wrap items-center justify-center gap-4"
			title="보유 씰 총 스탯"
		>
			{#each STATS as stat (stat.type)}
				<div class="md:text-md flex items-center gap-2 rounded-full text-sm">
					<dt class="text-xs text-gray-200">{stat.type}</dt>
					<dd class="font-bold text-point">
						{numberFormatter(stats[stat.type])}{#if stat.type === 'CT'}
							%
						{/if}
					</dd>
				</div>
			{/each}
		</div>
		<StatBarSeparator />
		<div
			class="flex items-center justify-center gap-2"
			title="보유 씰의 총 가격"
		>
			<dt class="ir">등록된 씰의 총 가격</dt>
			<dd>
				<StatBarTotalPrice {totalPrice} />
			</dd>
		</div>
	</dl>
</StatBarWrap>
