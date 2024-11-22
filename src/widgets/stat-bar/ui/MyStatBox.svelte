<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { type Stats, STATS, STATS_PERCENT_TYPE } from '$entities/seals'
	import { numberFormatter } from '$shared/lib'

	export let stats: Stats
</script>

<div
	class="mx-auto flex flex-wrap items-center gap-x-3 gap-y-1 port:w-[17.1em] land:justify-center land:gap-x-4"
	title={$_('seal.myTotalStats')}
>
	{#each STATS as stat (stat.type)}
		<div
			class="flex items-center gap-[0.1em] rounded-full text-sub-lg land:gap-2"
		>
			<dt class="w-[1.5em]">
				{stat.type}
			</dt>
			<dd class="text-right font-semibold text-point port:w-[3em]">
				{stats
					? numberFormatter(stats[stat.type])
					: 0}{#if STATS_PERCENT_TYPE.includes(stat.type)}
					%
				{/if}
			</dd>
		</div>
	{/each}
</div>
