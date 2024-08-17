<script lang="ts">
	import { raids, type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { timeSortByStartAt } from '$widgets/raid'
	import RaidItem from '$widgets/raid-bar/ui/RaidItem.svelte'
	import { onDestroy, onMount } from 'svelte'
	import RaidBarServerButton from './RaidBarServerButton.svelte'
	import { toast } from '$shared/toast'

	export let isSseSupported: boolean | undefined
	let nextRaid: RaidData | undefined
	let isAudioOn: boolean = false
	let audio: HTMLAudioElement | undefined
	let alarmTimer: NodeJS.Timeout | undefined
	const ALARM_READY_MINUTE = 1

	const toggleAudioAlarm = () => {
		audio = isAudioOn ? new Audio('/sound-alarm.mp3') : undefined
		toast.on(
			isAudioOn
				? '보스 등장 알림음이 활성화 되었습니다.'
				: '보스 등장 알림음이 비활성화 되었습니다.'
		)
	}

	$: isAudioOn && toggleAudioAlarm()

	const notify = (_nextRaid: RaidData) => {
		const time = _nextRaid.times[0]
		new Notification(`🐉 ${_nextRaid.name}`, {
			body: `[${time.channel}채널] ${_nextRaid.location} 에서\n보스가 곧 출현합니다!`
		})
	}

	$: setAlarm = (_nextRaid: RaidData) => {
		const time = _nextRaid.times[0]
		const bossTime = new Date(time.startAt).getTime()
		const currentTime = new Date().getTime()
		const alarmTiming = ALARM_READY_MINUTE * 60 * 1000
		const timeDifference = bossTime - currentTime
		if (timeDifference > 0) {
			if (alarmTimer) clearTimeout(alarmTimer)
			alarmTimer = setTimeout(() => {
				notify(_nextRaid)
				audio && audio.play()
			}, timeDifference - alarmTiming)
			setTimeout(() => {
				raids.removeTime(time)
			}, timeDifference)
		} else {
			raids.removeTime(time)
			console.log('이미 시간이 지났습니다.')
		}
	}

	$: updateNextRaid = () => {
		if ($raids.length === 0) return
		const times = $raids
			.map(({ times }) => (times.length > 0 ? times[0] : []))
			.flat()
		const timesSorted = timeSortByStartAt(times)
		if (timesSorted.length === 0) {
			nextRaid = undefined
			return
		}
		const nextTime = timesSorted[0]
		const nextRaidInfo = $raids.find(({ id }) => nextTime.raidId === id)
		if (!nextRaidInfo) {
			throw Error(
				`time - id:${nextTime.id}, raidId: ${nextTime.raidId} 에 해당하는 raid 데이터를 찾을 수 없습니다.`
			)
		}
		if (nextRaid?.times[0].id === nextTime.id) {
			return
		}
		nextRaid = { ...nextRaidInfo, times: [nextTime] }
		setAlarm(nextRaid)
	}

	onMount(() => {
		if (Notification.permission !== 'denied') {
			Notification.requestPermission()
		}
	})

	onDestroy(() => {
		clearInterval(alarmTimer)
	})

	$: $raids && updateNextRaid()
</script>

<div
	class={cn(
		'flex h-raid-bar-h items-center',
		'bg-primary-10',
		'text-[11px] leading-none',
		'whitespace-nowrap rounded-md drop-shadow-md'
	)}
>
	{#if isSseSupported === true}
		<RaidBarServerButton />
		<button
			class={cn(
				'flex-center relative h-full w-full flex-1 gap-1 px-2',
				'border-gradient border'
			)}
			title="레이드 정보 자세히 보기"
			on:click
		>
			{#if nextRaid}
				<RaidItem raid={nextRaid} />
			{:else if $raids.length > 0}
				보스 출현 정보를 제보해주세요!
				<iconify-icon icon="mdi:speak-outline" width={14} height={14} />
			{/if}
		</button>
		<button
			class="h-full rounded-br-md rounded-tr-md bg-primary-30 px-2"
			title={isAudioOn ? '알림음 활성화 상태' : '알림음 비활성화 상태'}
			on:click={() => (isAudioOn = !isAudioOn)}
		>
			<iconify-icon
				icon="mdi:bell{isAudioOn ? '' : '-off'}"
				width={14}
				height={14}
			/>
		</button>
	{:else if isSseSupported === false}
		<p class="w-full text-center text-gray-300">
			현재 브라우저에서는 보스 출현 알람 기능이 지원되지 않습니다. <br />다른
			브라우저를 이용해 주세요.
		</p>
	{/if}
</div>
