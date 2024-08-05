<script lang="ts">
	import type { Stats } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { STATS } from '$widgets/select-seal-form'

	export let stats: Stats
</script>

<div
	class={cn(
		'flex flex-col gap-1 p-2',
		'rounded-md border border-primary-50 bg-primary-10',
		'drop-shadow-primary-90'
	)}
>
	<div class="flex items-center justify-center">
		<h3 class="text-sm font-bold">내 능력치</h3>
	</div>
	<dl class="flex flex-wrap gap-1">
		{#each STATS as stat (stat.type)}
			<div class={cn('flex gap-2', 'sm:text-md rounded-full text-sm')}>
				<dt>{stat.type}</dt>
				<dd class="text-point w-[40px]">{stats[stat.type].toLocaleString()}</dd>
			</div>
		{/each}
	</dl>
</div>
