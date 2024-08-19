<script lang="ts">
	import { type Stats, STATS, STATS_PERCENT_TYPE } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'

	export let stats: Stats
	export let size: 'sm' | 'md' = 'md'
	const sizeStyles = {
		sm: 'gap-2 md:gap-4',
		md: 'gap-4'
	}
</script>

<div
	class="flex flex-wrap items-center justify-center {sizeStyles[size]}"
	title="보유 씰 총 스탯"
>
	{#each STATS as stat (stat.type)}
		<div class="flex items-center gap-2 rounded-full">
			<dt class="text-xs text-gray-200">{stat.type}</dt>
			<dd class="font-semibold text-point">
				{stats
					? numberFormatter(stats[stat.type])
					: 0}{#if STATS_PERCENT_TYPE.includes(stat.type)}
					%
				{/if}
			</dd>
		</div>
	{/each}
</div>
