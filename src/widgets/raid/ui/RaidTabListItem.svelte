<script lang="ts">
	import type { GameChannel, RaidData } from '$entities/raid'
	import {
		ToggleAlarmButton,
		ToggleFavoriteButton
	} from '$features/raid-timer/control-raid-timer-option'
	import { myLikeReports } from '$features/raid-timer/like-raid-time'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import {
		NeedSelectReportTooltip,
		RaidInformant,
		RaidLocation
	} from '$widgets/raid'

	export let raid: RaidData
	export let selectedRaid: RaidData

	$: duplicatedReportChannels = raid.times.reduce<GameChannel[]>(
		(acc, time) => {
			const channelTimes = raid.times.filter(
				(_time) => _time.channel === time.channel
			)
			if (channelTimes.length <= 1 || acc.includes(time.channel)) return acc
			return [...acc, time.channel]
		},
		[]
	)
	$: needSelectReport =
		duplicatedReportChannels.length > 0 &&
		!$myLikeReports.some((report) => report.raidId === raid.id)
	$: nextTime = raid.times[0]
</script>

<li
	role="presentation"
	class={cn(
		'relative flex w-full flex-col gap-1 p-1.5 land:gap-2 land:p-3',
		'rounded-md bg-gray-1',
		needSelectReport && 'data-[duplicated=true]:border-gradient-warning',
		selectedRaid?.id === raid.id
			? 'border border-gray-10 opacity-100'
			: 'border border-gray-4 opacity-40 land:hover:opacity-100'
	)}
	data-duplicated={needSelectReport}
>
	<div class="flex items-center justify-between">
		<p
			class="flex flex-1 flex-wrap gap-0.5 overflow-hidden port:flex-col land:gap-x-2"
		>
			<span class="max-w-full truncate land:text-body-lg">
				{raid.name}
			</span>
			<RaidLocation location={raid.location} />
		</p>
		<div class="flex-center relative z-[2]">
			{#if needSelectReport}
				<NeedSelectReportTooltip
					id="duplicated-report-{raid.id}"
					class="relative"
				/>
			{/if}
			<ToggleAlarmButton {raid} />
			<ToggleFavoriteButton {raid} />
		</div>
	</div>
	{#if nextTime}
		<p
			class={cn(
				'grid grid-cols-5 rounded-md text-center',
				'port:grid-cols-3 port:grid-rows-2',
				'gap-[3px] [&>*]:h-input-h-sm [&>*]:bg-gray-5/50'
			)}
		>
			<span class="flex-center text-[0.9em]">{nextTime.channel} 채널</span>
			<span class="flex-center col-span-2">
				<Timer time={nextTime} />
			</span>
			<span class="flex-center relative z-[1] col-span-2 port:col-span-3">
				<RaidInformant time={nextTime} />
			</span>
		</p>
	{:else}
		<p
			class="flex-center h-input-h-sm bg-gray-3 font-bold text-gray-8"
			title="제보가 없어요"
		>
			<Icon icon="mdi:dinosaur-pixel" size="1.3em" class="scale-x-[-1]" />
			?
		</p>
	{/if}
	<a
		href="?raid={raid.id}"
		title="자세히 보기"
		id="raid-tab-{raid.id}"
		aria-controls="raid-panel-{raid.id}"
		role="tab"
		aria-selected={selectedRaid?.id === raid.id}
		class="button-hover absolute left-0 top-0 size-full flex-1"
		data-sveltekit-noscroll
	>
		<span class="ir">레이드 자세히 보기</span>
	</a>
</li>
