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
	import {
		BeepToggleButton,
		NotificationToggleButton
	} from '$features/control-raid-timer-option'
	import { _objKeys, cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { getRemainingTime } from '$shared/time'
	import { timeSortByStartAt } from '$widgets/raid'
	import RaidAppearInfo from '$widgets/raid/ui/RaidAppearInfo.svelte'
	import RaidLocation from '$widgets/raid/ui/RaidLocation.svelte'
	import RaidNextIcon from '$widgets/raid/ui/RaidNextIcon.svelte'
	import RaidTitle from '$widgets/raid/ui/RaidTitle.svelte'
	import { onDestroy, onMount } from 'svelte'
	import { audioAlarm, isAudioOn } from '$features/control-raid-timer-option'
	import RaidServerDropdown from './RaidServerDropdown.svelte'

	let isSseSupported: boolean | undefined
	let nextRaid: NextRaidData | undefined
	let alarmTimer: NodeJS.Timeout | undefined
	let removeChannelTimer: NodeJS.Timeout | undefined
	let isSseConnected = false

	let eventSource: EventSource | undefined
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
	$: isGreuta =
		typeof window !== 'undefined' && window.location.href.includes('greuta.org')

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

	$: checkEventSourceConnect = () => {
		if (
			!eventSource ||
			document.visibilityState !== 'visible' ||
			eventSource.readyState !== EventSource.CLOSED
		)
			return

		initRaidSubscribe()
	}

	const subscribeSSE = async (serverType: ServerType) => {
		await clearPrevSubscribe()
		const clientId = await getClientId()
		eventSource = new EventSource(
			`${API_BASE_URL}/alarms/subscribe/${serverType}?clientId=${clientId}`
		)
		handleEventSource(eventSource)
	}

	$: initRaidSubscribe = async () => {
		const server = $crrServerType || 'luce'
		const raidsFetched = await getRaids(server)
		raids.set(raidsFetched)
		if (isGreuta) return
		subscribeSSE(server)
		setTimeout(() => {
			if (!isSseConnected)
				alert(
					'연결에 실패하였습니다. 화면을 새로고침 해주세요. \n문제가 해결되지 않는다면 관리자에게 문의해주세요.'
				)
		}, 5000)
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

	const notify = (_nextRaid: NextRaidData) => {
		const remainingTime = getRemainingTime(_nextRaid.time.startAt)
		const text =
			remainingTime === '출현 중'
				? `${remainingTime} 입니다!`
				: remainingTime === '곧 출현'
					? `${remainingTime} 합니다!`
					: `출현하기 ${remainingTime} 입니다!`
		new Notification(`🐉 ${_nextRaid.name}`, {
			body: `[${_nextRaid.time.channel}채널] ${_nextRaid.location} 에서\n보스가 ${text}`
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
				$audioAlarm && $isAudioOn && $audioAlarm.play()
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
		<RaidServerDropdown />
		<a
			href="/{$lang}{MENUS.raid.path}"
			class={cn(
				'flex-center relative h-full w-full flex-1 gap-2 px-2',
				'border-gradient button-hover border-b border-t'
			)}
			title="레이드 타이머 전체 보기"
		>
			{#if nextRaid}
				<span class="flex items-center gap-2 leading-none">
					<span class="flex md:gap-1 sm:flex-col">
						<RaidTitle title={nextRaid.name} />
						<RaidLocation location={nextRaid.location} />
					</span>
					<RaidNextIcon />
					<span class="flex flex-wrap items-center gap-x-1 gap-y-[0.1em]">
						<RaidAppearInfo time={nextRaid.time} />
					</span>
				</span>
			{:else if $raids.length > 0}
				보스 출현 정보를 제보해주세요!
				<iconify-icon icon="mdi:speak-outline" width={14} height={14} />
			{/if}
		</a>
		{#if !isGreuta}
			<div class="flex h-full">
				{#if !isSseConnected}
					<button
						class="flex-center button-hover h-full flex-wrap gap-1 bg-warning px-4"
						on:click={initRaidSubscribe}
					>
						<iconify-icon icon="ooui:network-off" width={14} height={14} />
						<span>연결 재시도</span>
					</button>
				{:else}
					<NotificationToggleButton />
					<div class="overflow-hidden rounded-br-md rounded-tr-md">
						<BeepToggleButton />
					</div>
				{/if}
			</div>
		{/if}
	{:else if isSseSupported === false}
		<p class="w-full text-center text-gray-300">
			현재 브라우저에서는 보스 출현 알람 기능이 지원되지 않습니다. <br />다른
			브라우저를 이용해 주세요.
		</p>
	{/if}
</div>
