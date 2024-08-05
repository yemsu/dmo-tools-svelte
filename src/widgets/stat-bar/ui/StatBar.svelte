<script lang="ts">
	import type { Stats } from '$entities/seals'
	import { STATS } from '$widgets/select-seal-form'

	export let stats: Stats
</script>

<div class="flex items-center gap-2 border-t border-gray-700 pt-4 sm:gap-4">
	<h3 class="shrink-0 font-bold">능력치</h3>
	<dl class="flex flex-wrap gap-1 sm:gap-2">
		{#each STATS as stat (stat.type)}
			<div
				class="sm:text-md flex gap-1 rounded-full bg-gray-800 px-3 py-1 text-sm sm:gap-2"
			>
				<dt>{stat.name}</dt>
				<dd>{stats[stat.type]}</dd>
			</div>
		{/each}
	</dl>
</div>
