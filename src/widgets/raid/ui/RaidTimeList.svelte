<script lang="ts">
	import { type GameChannel, type RaidData } from '$entities/raid'
	import { LikeRaidTimeButton } from '$features/like-raid-time'
	import { Badge } from '$shared/badge'
	import { cn, objectBy } from '$shared/lib'
	import { NoData } from '$shared/text'

	export let raid: RaidData
	export let raidChannels: GameChannel[]
	$: raidTimeByChannel = objectBy(raid.times, (time) => time.channel)
</script>

<ul class="flex flex-col gap-4">
	{#each raidChannels as channel (channel)}
		<li class="flex flex-col items-start gap-1.5">
			<Badge size="md" color="gray">
				{channel} 채널
			</Badge>
			{#if raidTimeByChannel[channel] && raidTimeByChannel[channel].length > 0}
				<ol class="flex w-full flex-col gap-2">
					{#each raidTimeByChannel[channel] as time, i}
						<li class={cn('rounded-md bg-gray-3')}>
							<span class="ir">정확도 {i + 1}순위</span>
							<LikeRaidTimeButton {raid} {time} />
						</li>
					{/each}
				</ol>
			{:else}
				<NoData class="min-h-input-h w-full leading-none" compact>-</NoData>
			{/if}
		</li>
	{/each}
</ul>
