<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn, timeRemainingString } from '$shared/lib'
	import RaidItemTime from '$widgets/raid-bar/ui/RaidItemTime.svelte'

	export let raid: RaidData
	export let compact: true | undefined = undefined
	$: nextTime = raid.times[0]
	$: timeString = nextTime && timeRemainingString(nextTime.startAt)
</script>

<span
	class={cn(
		'leading-none',
		compact
			? 'flex flex-col gap-1.5 md:flex-row md:items-center md:gap-1'
			: 'flex items-center gap-1'
	)}
>
	<span
		class="flex flex-col gap-1 text-left md:flex-row md:items-center md:text-center"
	>
		<span class="text-[10px] text-gray-400">
			{raid.location}
		</span>
		<span class="font-bold">{raid.name}</span>
	</span>
	<span class="flex items-center gap-1">
		<iconify-icon
			icon="line-md:chevron-triple-right"
			width={12}
			height={12}
			class="-mb-[2px] text-gray-300 {compact ? 'hidden md:inline' : ''}"
		/>
		{#if nextTime}
			<RaidItemTime time={nextTime} />
		{:else}
			<span class="text-[11px] text-gray-400 md:text-xs">제보 없음</span>
		{/if}
	</span>
</span>
