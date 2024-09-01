<script lang="ts">
	import { type Stats, STATS, STATS_PERCENT_TYPE } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'

	export let stats: Stats
	export let size: 'sm' | 'md' = 'md'
	const sizeStyles = {
		sm: 'gap-x-3 gap-y-2 md:gap-x-4',
		md: 'gap-x-3 gap-y-2 md:gap-x-4'
	}
</script>

<div
	class="flex flex-wrap items-center {sizeStyles[
		size
	]} mx-auto md:justify-center sm:w-[17.1em]"
	title="보유 씰 총 스탯"
>
	{#each STATS as stat (stat.type)}
		<div class="flex items-center gap-[0.1em] rounded-full md:gap-2">
			<dt class="w-[1.5em] text-xs3 text-gray-200 md:text-xs">{stat.type}</dt>
			<dd
				class="text-right text-xs3 font-semibold text-point md:text-sm sm:w-[3em]"
			>
				{stats
					? numberFormatter(stats[stat.type])
					: 0}{#if STATS_PERCENT_TYPE.includes(stat.type)}
					%
				{/if}
			</dd>
		</div>
	{/each}
</div>
