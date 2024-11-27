<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		putRaidTimeVote,
		subscribeClientId,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { BusinessError, showErrorToast } from '$shared/api'
	import { cn, timeRemainingString } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	export let time: RaidTimeData

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
		toast.on('레이드 제보에 좋아요를 눌렀습니다.')
	}
</script>

<button
	class={cn(
		'button-hover relative flex flex-1 items-center justify-between gap-2 rounded-tl-md bg-gray-3 p-2 land:gap-4 land:p-3'
	)}
	title="좋아요"
	on:click={() => onClickVote(raid, time)}
>
	<span class="whitespace-nowrap">
		<iconify-icon icon="oi:heart" width="0.8em" height="0.8em" />
		{time.voteCount + 1}</span
	>
	<Timer {time} class="flex-1" />
</button>
