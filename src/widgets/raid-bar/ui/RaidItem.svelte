<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { Badge } from '$shared/badge'
	import { cn } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import { RaidInformant, RaidLocation, RaidTitle } from '$widgets/raid'
	export let raid: RaidData
	$: nextTime = raid.times[0]
</script>

<span class={cn('flex leading-none port:flex-col land:items-center')}>
	<span
		class={cn(
			'relative flex gap-2 text-left',
			'bg-gray-1',
			'land:w-[40%] land:flex-col land:p-3 land:pr-[12px]',
			'port:flex-col port:items-center port:p-2'
		)}
	>
		<RaidTitle title={raid.name} />
		<RaidLocation location={raid.location} />
	</span>
	<span class={cn('flex-center flex-1 p-2')}>
		{#if nextTime}
			<span class="flex flex-wrap items-center justify-center gap-[0.6em]">
				<span class="flex-center flex-wrap gap-[0.4em]">
					<Badge size="md" color="gray">
						{nextTime.channel} 채널
					</Badge>
					<Timer time={nextTime} />
				</span>
				<span class="flex-center gap-2">
					<span
						class="text-[0.5em] text-gray-9 after:content-['ㅡ'] port:hidden"
					></span>
					<RaidInformant user={nextTime.user} />
				</span>
			</span>
		{:else}
			<span class="text-gray-9">제보 없음</span>
		{/if}
	</span>
</span>
