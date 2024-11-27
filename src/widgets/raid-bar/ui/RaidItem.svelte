<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { Badge } from '$shared/badge'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import { RaidInformant, RaidLocation } from '$widgets/raid'
	export let raid: RaidData
	$: nextTime = raid.times[0]
</script>

<span class={cn('flex flex-col gap-1 p-1.5 text-left land:gap-2 land:p-3')}>
	<span class="flex p-1">
		<span class="flex gap-0.5 port:flex-col land:gap-2">
			<span class="max-w-full truncate land:text-body-lg">
				{raid.name}
			</span>
			<RaidLocation location={raid.location} />
		</span>
	</span>
	{#if nextTime}
		<span
			class={cn(
				'grid grid-cols-5 rounded-md text-center',
				'port:grid-cols-3 port:grid-rows-2',
				'gap-[3px] bg-gray-1 [&>*]:h-input-h-sm [&>*]:bg-gray-3'
			)}
		>
			<span class="flex-center text-[0.9em]">{nextTime.channel} 채널</span>
			<span class="flex-center col-span-2">
				<Timer time={nextTime} />
			</span>
			<span class="flex-center col-span-2 port:col-span-3">
				<RaidInformant time={nextTime} />
			</span>
		</span>
	{:else}
		<span
			class="flex-center h-input-h-sm bg-gray-3 font-bold text-gray-8"
			title="제보가 없어요"
		>
			<Icon icon="mdi:dinosaur-pixel" size="1.3em" class="scale-x-[-1]" />
			?
		</span>
	{/if}
</span>
