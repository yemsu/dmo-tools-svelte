<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { type Stats, STATS, STATS_PERCENT_TYPE } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'

	export let stats: Stats
</script>

<div
	class="mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-center md:gap-x-4 sm:w-[17.1em]"
	title={$_('seal.myTotalStats')}
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
