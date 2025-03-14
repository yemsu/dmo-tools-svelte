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
	import { PUBLIC_API_BASE_URL } from '$env/static/public'
	import {
		audioAlarm,
		getRemainingTime,
		isAudioOn,
		raidOption,
		Timer
	} from '$features/raid/control-raid-timer'
	import { timeSortByStartAt } from '$features/raid/display-raid-info'
	import RaidLocation from '$features/raid/display-raid-info/ui/RaidLocation.svelte'
	import RaidNextIcon from '$features/raid/display-raid-info/ui/RaidNextIcon.svelte'
	import { myLikeReports } from '$features/raid/like-raid-time'
	import { Badge } from '$shared/badge'
	import { Icon } from '$shared/icon'
	import { _objKeys, cn } from '$shared/lib'
	import { langPath } from '$shared/model'
	import { Tooltip } from '$shared/tooltip'
	import { onDestroy, onMount } from 'svelte'

	let isSseSupported: boolean | undefined
	let nextRaid: NextRaidData | undefined
	let alarmTimer: NodeJS.Timeout | undefined
	let removeChannelTimer: NodeJS.Timeout | undefined
	let isSseConnected: boolean | undefined = undefined

	let eventSource: EventSource | undefined

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
			raids.addNewTime(createdTime, $raidOption)
		})
		_eventSource.addEventListener('voted', function (e) {
			const votedTime = JSON.parse(e.data)
			raids.voteTime(votedTime, $raidOption)
		})
		_eventSource.addEventListener('removed', function (e) {
			const removedTime = JSON.parse(e.data)
			raids.removeTime(removedTime, $raidOption)
		})
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
			`${PUBLIC_API_BASE_URL}/alarms/subscribe/${serverType}?clientId=${clientId}`
		)
		handleEventSource(eventSource)
	}

	$: initRaidSubscribe = async () => {
		const server = $crrServerType || 'luce'
		const raidsFetched = await getRaids(server)
		raids.set(raidsFetched, $raidOption)
		subscribeSSE(server)

		setTimeout(() => {
			if (!isSseConnected)
				alert(
					'연결에 실패하였습니다. 화면을 새로고침 해주세요. \n문제가 해결되지 않는다면 관리자에게 문의해주세요.'
				)
		}, 5000)
	}

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
				raids.removeChannelTimes(time, $raidOption)
			}, timeDifference)
		} else {
			raids.removeChannelTimes(time, $raidOption)
			console.log('이미 시간이 지났습니다.')
		}
	}

	$: updateNextRaid = () => {
		if ($raids.length === 0) return
		const times = $raids
			.map(({ times, id }) => {
				// 알람 비활성화 설정된 경우 시간 리스트업 X
				if ($raidOption.noAlarmRaidIds?.some((strId) => +strId === id)) {
					return []
				}
				return times.length > 0 ? times[0] : []
			})
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
		myLikeReports.loadMyLikeReports()
		myLikeReports.cleanOldRaidReports($raids)

		raidOption.loadAllOptions()

		if (typeof EventSource !== 'undefined') {
			isSseSupported = true
		} else {
			isSseSupported = false
			return
		}
		crrServerType.loadSavedData(_objKeys(GAME_SERVERS)[0])
		alarmMinute.loadSavedData()
		document.addEventListener('visibilitychange', checkEventSourceConnect)
	})

	onDestroy(() => {
		if (typeof window === 'undefined') return
		document.removeEventListener('visibilitychange', checkEventSourceConnect)
		subscribeClientId.set(undefined)
		clearInterval(alarmTimer)
	})

	$: $raids && updateNextRaid()
	$: nextRaid && $alarmMinute && setAlarm(nextRaid)
	$: hasDuplicatedReport = nextRaid?.times.reduce((result, time) => {
		const channelReports = nextRaid?.times.filter(
			(_time) => time.channel === _time.channel
		)
		return channelReports ? channelReports.length >= 2 : result
	}, false)
	$: needSelectReport =
		nextRaid &&
		hasDuplicatedReport &&
		!$myLikeReports.some((report) => report.raidId === nextRaid?.id)
</script>

<aside
	class={cn(
		'relative z-raidBar',
		'port:fixed port:top-header-h port:w-full',
		'port:border-b port:border-t port:border-background',
		'whitespace-nowrap bg-gray-3 text-sub-lg leading-none land:bg-blue-4/10',
		$$restProps.class
	)}
>
	<h2 class="ir">다음 출현 레이드 정보</h2>
	{#if isSseSupported === true}
		<a
			href="{$langPath}{MENUS.raid.path}{nextRaid
				? `?raid=${nextRaid.id}`
				: ''}"
			class={cn(
				'button-hover flex-center relative min-h-raid-bar-h w-full flex-1'
			)}
			title="레이드 타이머 전체 보기"
		>
			{#if nextRaid}
				<p class={cn('flex items-center leading-none land:w-full')}>
					<span
						class={cn(
							'flex-shrink overflow-hidden px-1.5',
							'port:flex port:gap-1',
							'land:flex-col-center land:w-[60%] land:gap-2 land:py-3'
						)}
					>
						<span class="max-w-full truncate leading-none">{nextRaid.name}</span
						>
						<RaidLocation location={nextRaid.location} />
					</span>

					<RaidNextIcon class="land:hidden" />
					<span
						class={cn(
							'flex-center px-1.5',
							'port:flex-wrap port:gap-x-1 port:gap-y-[0.1em]',
							'land:flex-1 land:flex-col land:gap-2'
						)}
					>
						<Badge size="sm" color="gray">
							{nextRaid.time.channel} 채널
						</Badge>
						<Timer time={nextRaid.time} />
					</span>
				</p>
			{:else if $raids.length > 0}
				<p class="flex-center gap-1">
					<Icon icon="mdi:dinosaur-pixel" size={12} class="-mb-[1px]" />
					보스 출현 정보를 제보해주세요!
				</p>
			{/if}
		</a>
		{#if needSelectReport}
			<Tooltip
				as="p"
				id="dup-report-raidbar"
				size="sm"
				color="warning"
				defaultShow={true}
				class="-top-2 left-1/2 -translate-x-1/2 -translate-y-full"
			>
				확인이 필요한 제보예요!
			</Tooltip>
		{/if}
		{#if isSseConnected === false}
			<button
				class="flex-center button-hover h-[25px] w-full gap-1 bg-warning px-4"
				on:click={initRaidSubscribe}
			>
				<Icon icon="ooui:network-off" size={14} />
				<span>연결 재시도</span>
			</button>
		{/if}
	{:else if isSseSupported === false}
		<p class="w-full text-center text-gray-10">
			현재 브라우저에서는 보스 출현 알람 기능이 지원되지 않습니다. <br />다른
			브라우저를 이용해 주세요.
		</p>
	{/if}
</aside>
