<script lang="ts">
	import { MENUS } from '$entities/menus'
	import {
		alarmMinute,
		crrServerType,
		disSubscribe,
		GAME_SERVERS,
		getClientId,
		getRaids,
		raids,
		subscribeClientId,
		type NextRaidData,
		type RaidTimeData,
		type ServerType
	} from '$entities/raid'
	import Badge from '$shared/badge/Badge.svelte'
	import { _objKeys, cn } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { timeSortByStartAt } from '$widgets/raid'
	import NotificationToggleButton from '$widgets/raid-bar/ui/NotificationToggleButton.svelte'
	import RaidAppearInfo from '$widgets/raid/ui/RaidAppearInfo.svelte'
	import RaidLocation from '$widgets/raid/ui/RaidLocation.svelte'
	import RaidNextIcon from '$widgets/raid/ui/RaidNextIcon.svelte'
	import RaidTitle from '$widgets/raid/ui/RaidTitle.svelte'
	import { onDestroy, onMount } from 'svelte'
	import RaidBarServerButton from './RaidBarServerButton.svelte'

	let isSseSupported: boolean | undefined
	let nextRaid: NextRaidData | undefined
	let isAudioOn: boolean = false
	let audio: HTMLAudioElement | undefined
	let alarmTimer: NodeJS.Timeout | undefined
	let removeChannelTimer: NodeJS.Timeout | undefined
	let isSseConnected = false

	let eventSource: EventSource | undefined
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	$: clearPrevSubscribe = async () => {
		if (!eventSource || !$subscribeClientId) return
		eventSource.close()
		eventSource = undefined
		return await disSubscribe($subscribeClientId)
	}

	const handleEventSource = async (_eventSource: EventSource) => {
		_eventSource.addEventListener('sub', function (e) {
			isSseConnected = true
			const data = JSON.parse(e.data)
			subscribeClientId.set(data.clientId)
		})
		_eventSource.addEventListener('created', function (e) {
			const createdTime = JSON.parse(e.data) as RaidTimeData
			raids.addNewTime(createdTime)
		})
		_eventSource.addEventListener('voted', function (e) {
			const votedTime = JSON.parse(e.data)
			raids.voteTime(votedTime)
		})
		_eventSource
		// _eventSource.addEventListener('notify', function (e) {
		// 	const data = JSON.parse(e.data)
		// 	console.log('notify')
		// })
		_eventSource.addEventListener('error', function (e) {
			console.error('error occurred', e)
			isSseConnected = false
		})
	}

	const reConnectSse = async () => {
		await clearPrevSubscribe()
		initRaidSubscribe()
	}

	$: checkEventSourceConnect = () => {
		if (
			!eventSource ||
			document.visibilityState !== 'visible' ||
			eventSource.readyState !== EventSource.CLOSED
		)
			return

		reConnectSse()
	}

	const getIp = async () => {
		const ipRes = await fetch('https://ipinfo.io/json?token=d49252de2b4da0')
		if (!ipRes.ok) {
			throw Error(`HTTP error! get ip Failed! ${ipRes.status}`)
		}
		const data: { ip: string } = await ipRes.json()
		return data.ip
	}

	const subscribeSSE = async (serverType: ServerType) => {
		await clearPrevSubscribe()
		const ip = await getIp()
		const clientId = await getClientId(ip)
		eventSource = new EventSource(
			`${API_BASE_URL}/alarms/subscribe/${serverType}?clientId=${clientId}`
		)
		handleEventSource(eventSource)
	}

	$: initRaidSubscribe = async () => {
		if (!$crrServerType) return
		const raidsFetched = await getRaids($crrServerType)
		raids.set(raidsFetched)
		subscribeSSE($crrServerType)
	}

	onMount(async () => {
		crrServerType.loadSavedData(_objKeys(GAME_SERVERS)[0])
		alarmMinute.loadSavedData()
		document.addEventListener('visibilitychange', checkEventSourceConnect)
	})

	onDestroy(() => {
		if (typeof window === 'undefined') return
		document.removeEventListener('visibilitychange', checkEventSourceConnect)
	})

	$: $crrServerType && initRaidSubscribe()

	const toggleAudioAlarm = () => {
		audio = isAudioOn ? new Audio('/sound-alarm.mp3') : undefined
		toast.on(
			isAudioOn
				? '보스 등장 알림음이 활성화 되었습니다.'
				: '보스 등장 알림음이 비활성화 되었습니다.'
		)
	}

	$: isAudioOn !== undefined && toggleAudioAlarm()

	const notify = (_nextRaid: NextRaidData) => {
		new Notification(`🐉 ${_nextRaid.name}`, {
			body: `[${_nextRaid.time.channel}채널] ${_nextRaid.location} 에서\n보스가 곧 출현합니다!`
		})
	}

	$: setAlarm = (_nextRaid: NextRaidData) => {
		const { time } = _nextRaid
		const bossTime = new Date(time.startAt).getTime()
		const currentTime = new Date().getTime()
		const alarmTiming = $alarmMinute * 60 * 1000
		const timeDifference = bossTime - currentTime
		if (timeDifference > 0) {
			if (alarmTimer) clearTimeout(alarmTimer)
			if (removeChannelTimer) clearTimeout(removeChannelTimer)
			alarmTimer = setTimeout(() => {
				notify(_nextRaid)
				audio && isAudioOn && audio.play()
			}, timeDifference - alarmTiming)
			removeChannelTimer = setTimeout(() => {
				raids.removeChannelTimes(time)
			}, timeDifference)
		} else {
			raids.removeChannelTimes(time)
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
		if (nextRaid?.time.id === nextTime.id) {
			return
		}
		nextRaid = { ...nextRaidInfo, time: nextTime }
		setAlarm(nextRaid)
	}

	onMount(() => {
		if (typeof EventSource !== 'undefined') {
			isSseSupported = true
		} else {
			isSseSupported = false
			return
		}
	})

	onDestroy(() => {
		clearInterval(alarmTimer)
	})

	$: $raids && updateNextRaid()
	$: nextRaid && $alarmMinute && setAlarm(nextRaid)
</script>

<div
	class={cn(
		'relative z-raidBar flex h-raid-bar-h items-center',
		'bg-primary-10',
		'text-xs2 leading-none',
		'whitespace-nowrap rounded-md drop-shadow-md'
	)}
>
	{#if isSseSupported === true}
		<RaidBarServerButton />
		<a
			href={MENUS.RAID.path}
			class={cn(
				'flex-center relative h-full w-full flex-1 gap-2 px-2',
				'border-gradient border-b border-t'
			)}
			title="레이드 타이머 전체 보기"
		>
			<Badge color="warning" shape="square" class="italic">Beta</Badge>
			{#if nextRaid}
				<span class="flex items-center gap-2 leading-none">
					<span class="flex md:gap-1 sm:flex-col">
						<RaidTitle title={nextRaid.name} />
						<RaidLocation location={nextRaid.location} />
					</span>
					<RaidNextIcon />
					<span>
						<RaidAppearInfo time={nextRaid.time} />
					</span>
				</span>
			{:else if $raids.length > 0}
				보스 출현 정보를 제보해주세요!
				<iconify-icon icon="mdi:speak-outline" width={14} height={14} />
			{/if}
		</a>
		<div class="flex h-full overflow-hidden rounded-br-md rounded-tr-md">
			{#if !isSseConnected}
				<button
					class="flex-center h-full gap-1 bg-warning px-4"
					on:click={reConnectSse}
				>
					<iconify-icon icon="ooui:network-off" width={14} height={14} />
					연결 재시도
				</button>
			{:else}
				<NotificationToggleButton />
				<button
					class="h-full bg-primary-30 px-2"
					title={isAudioOn ? '알림음 활성화 상태' : '알림음 비활성화 상태'}
					on:click={() => (isAudioOn = !isAudioOn)}
				>
					<iconify-icon
						icon="mdi:bell{isAudioOn ? '' : '-off'}"
						width={14}
						height={14}
					/>
				</button>
			{/if}
		</div>
	{:else if isSseSupported === false}
		<p class="w-full text-center text-gray-300">
			현재 브라우저에서는 보스 출현 알람 기능이 지원되지 않습니다. <br />다른
			브라우저를 이용해 주세요.
		</p>
	{/if}
</div>
