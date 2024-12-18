<script lang="ts">
	import { type GameChannel, type RaidData } from '$entities/raid'
	import { myLikeReports } from '$features/like-raid-time'
	import { AddRaidTimeButton } from '$features/update-raid-time'
	import { Icon } from '$shared/icon'
	import { cn, objectBy } from '$shared/lib'
	import { NoData, Title } from '$shared/text'
	import RaidTimeListItem from './RaidTimeListItem.svelte'

	export let raid: RaidData
	export let raidChannels: GameChannel[]
	$: raidTimeByChannel = objectBy(raid.times, (time) => time.channel)
</script>

<ul class="flex flex-1 flex-col gap-4">
	{#each raidChannels as channel (channel)}
		{@const isAlreadyLike = $myLikeReports.some(
			(report) => report.raidId === raid.id && report.channel === channel
		)}
		<li class="flex flex-col items-start gap-1.5">
			<div
				class="flex w-full items-center justify-between gap-2 port:flex-wrap"
			>
				<Title size="xxs" tag="h3">
					{channel} 채널
				</Title>
				<div>
					<AddRaidTimeButton {raid} {channel} title="{channel}채널 보스 제보" />
				</div>
			</div>
			{#if raidTimeByChannel[channel]?.length > 1 && !isAlreadyLike}
				<p class="flex items-center gap-1 text-sub-lg font-bold text-warning">
					<Icon icon="mdi:warning-decagram" />
					제보가 여러개예요! 가장 근접한 제보에 좋아요🤍를 눌러주세요.
				</p>
			{/if}
			{#if raidTimeByChannel[channel] && raidTimeByChannel[channel].length > 0}
				<ol class="flex w-full flex-col gap-2">
					{#each raidTimeByChannel[channel] as time, i}
						<li
							class={cn(
								i === 0
									? 'border-b border-t border-point/40'
									: 'border-b border-t border-gray-5',
								'rounded-md '
							)}
						>
							<span class="ir">정확도 {i + 1}순위</span>
							<RaidTimeListItem {raid} {time} {channel} />
						</li>
					{/each}
				</ol>
			{:else}
				<NoData class="min-h-input-h w-full leading-none" compact>-</NoData>
			{/if}
		</li>
	{/each}
</ul>
<p class="mt-4 text-center text-sub-lg font-semibold text-gray-10">
	허위제보 시 <br class="land:hidden" />사이트 이용이 제한될 수 있습니다
</p>
