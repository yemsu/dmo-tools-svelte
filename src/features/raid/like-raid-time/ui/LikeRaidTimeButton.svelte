<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		putRaidTimeVote,
		subscribeClientId,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { myLikeReports } from '$features/raid/like-raid-time'
	import { BusinessError, showErrorToast } from '$shared/api'
	import { cn, timeRemainingString } from '$shared/lib'
	import { Timer } from '$features/raid/control-raid-timer'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	export let time: RaidTimeData
	$: isAlreadyLike = $myLikeReports.some((report) => report.timeId === time.id)

	$: onClickVote = async (raid: RaidData, time: RaidTimeData) => {
		if (!$crrServerType || !$subscribeClientId) {
			throw Error(
				`onClickVote: crrServerType||subscribeClientId(${crrServerType},${subscribeClientId}) is undefined`
			)
		}
		if (time.clientId === $subscribeClientId) {
			const error = new BusinessError('UNKNOWN', '권한이 없습니다.')
			showErrorToast(error)
			throw error
		}
		const isConfirmed = confirm(
			`이 제보가 맞나요? \n [${GAME_SERVERS[$crrServerType]} 서버] ${raid.name} - [${time.channel}채널] ${timeRemainingString(time.startAt)} 출현`
		)
		if (!isConfirmed) return
		await putRaidTimeVote($subscribeClientId, time.id)
		myLikeReports.saveMyLikeReports(raid.id, time.channel, time.id)
		toast.on('레이드 제보에 좋아요를 눌렀습니다.')
	}
</script>

<button
	class={cn(
		'button-hover relative flex flex-1 items-center justify-between gap-2 rounded-l-md bg-gray-3 p-2 land:gap-4 land:p-3'
	)}
	title={isAlreadyLike ? '이미 좋아한 제보입니다' : '좋아요'}
	on:click={() => onClickVote(raid, time)}
>
	<span class={cn('whitespace-nowrap', isAlreadyLike && 'text-point/60')}>
		<iconify-icon icon="oi:heart" width="0.8em" height="0.8em" />
		{time.voteCount + 1}</span
	>
	<Timer {time} class="flex-1" />
</button>
