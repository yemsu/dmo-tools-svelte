<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import RaidItemChannel from '$widgets/raid-bar/ui/RaidItemChannel.svelte'
	import RaidLocation from '$widgets/raid-bar/ui/RaidLocation.svelte'

	export let raid: RaidData
	export let compact: true | undefined = undefined
	$: nextTime = raid.times[0]
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
		<span class="flex gap-[1px] break-keep font-bold leading-[1.2]">
			<iconify-icon
				icon="mdi:dinosaur-pixel"
				width={13}
				height={13}
				class="-mb-[2px]"
			/>
			{raid.name}
		</span>
		<RaidLocation location={raid.location} />
	</span>
	<span class="flex items-center gap-1">
		<iconify-icon
			icon="line-md:chevron-triple-right"
			width={12}
			height={12}
			class="-mb-[2px] text-gray-300 {compact ? 'hidden md:inline' : ''}"
		/>
		{#if nextTime}
			<RaidItemChannel channel={nextTime.channel} />
			<Timer targetTime={nextTime.startAt} />
		{:else}
			<span class="text-[11px] text-gray-400 md:text-xs">제보 없음</span>
		{/if}
	</span>
</span>
