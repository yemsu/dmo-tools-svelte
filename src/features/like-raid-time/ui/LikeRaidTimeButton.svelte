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
	import { timeRemainingString } from '$shared/lib'
	import Timer from '$shared/time/ui/Timer.svelte'
	import { toast } from '$shared/toast'
	import RaidInformant from '$widgets/raid/ui/RaidInformant.svelte'

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
	class="button-hover flex h-input-h w-full items-center justify-between py-1.5 port:text-body-sm"
	title="좋아요"
	on:click={() => onClickVote(raid, time)}
>
	<span
		class="flex-center min-w-[4em] gap-[0.3em] border-r border-gray-5 md:min-w-[5em]"
	>
		<iconify-icon icon="oi:heart" width="1em" height="1em" />
		{time.voteCount + 1}
	</span>
	<span class="flex-center flex-1 border-r border-gray-5">
		<Timer {time} />
	</span>
	<span
		class="flex-center min-w-[6em] shrink-0 text-balance px-[0.6em] md:min-w-[10em] md:px-[1em] sm:max-w-[7em]"
	>
		<RaidInformant user={time.user} />
	</span>
</button>
