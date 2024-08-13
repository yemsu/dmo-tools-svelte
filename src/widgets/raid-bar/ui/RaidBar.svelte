<script lang="ts">
	import { raids, type RaidData, type RaidTimeData } from '$entities/raid'
	import { cn, timeRemainingString } from '$shared/lib'
	import { type TimeUnit } from '$shared/time'
	import { timeSortByStartAt } from '$widgets/raid'
	import RaidBarServerButton from './RaidBarServerButton.svelte'

	let time: Record<TimeUnit, number> = {
		h: 1,
		m: 30,
		s: 20
	}

	let nextRaid: { raid: RaidData; time: RaidTimeData } | undefined

	const updateNextRaid = (_raids: RaidData[]) => {
		if (_raids.length === 0) return
		const times = _raids
			.map(({ times }) => (times.length > 0 ? times[0] : []))
			.flat()
		const timesSorted = timeSortByStartAt(times)
		if (timesSorted.length === 0) {
			nextRaid = undefined
			return
		}
		const nextTime = timesSorted[0]
		const nextRaidInfo = _raids.find(({ id }) => nextTime.raidId === id)
		if (!nextRaidInfo) {
			throw Error(
				`time - id:${nextTime.id}, raidId: ${nextTime.raidId} 에 해당하는 raid 데이터를 찾을 수 없습니다.`
			)
		}
		nextRaid = { raid: nextRaidInfo, time: nextTime }
	}

	$: $raids && updateNextRaid($raids)
</script>

<div
	class={cn(
		'flex h-raid-bar-h items-center',
		'border border-primary-50 bg-primary-5/80',
		'text-[11px] leading-none',
		'whitespace-nowrap rounded-md drop-shadow-md'
	)}
>
	<RaidBarServerButton />
	<button
		class={cn('flex-center relative gap-1', 'h-full flex-1 px-2')}
		title="레이드 정보 자세히 보기"
		on:click
	>
		{#if nextRaid}
			{@const timeString = timeRemainingString(nextRaid.time.startAt)}
			<span>
				{nextRaid.raid.name}
				<span class="text-[11px] text-gray-400">
					{nextRaid.raid.location}
				</span>
			</span>
			<span>
				<iconify-icon
					icon="line-md:chevron-triple-right"
					width={12}
					height={12}
					class="-mb-[2px] text-gray-300"
				/>
			</span>
			<span class="rounded-full bg-primary-30 px-2 py-0.5 text-[10px]">
				{nextRaid.time.channel} 채널
			</span>
			<span class="text-point">
				<iconify-icon
					icon="mdi:dinosaur-pixel"
					width={13}
					height={13}
					class="-mb-[2px]"
				/>
				{timeString.includes('출현') ? timeString : `${timeString} 출현`}
			</span>
		{:else if $raids.length > 0}
			제보된 레이드 정보가 없습니다. 보스 출현 정보를 제보해주세요!
			<iconify-icon icon="mdi:speak-outline" width={14} height={14} />
		{/if}
	</button>
</div>
