<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		putRaidTimeVote,
		subscribeClientId,
		type GameChannel,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { cn, objectBy, timeRemainingString } from '$shared/lib'
	import { NoData } from '$shared/text'
	import Timer from '$shared/time/ui/Timer.svelte'
	import { toast } from '$shared/toast'
	import RaidItemChannel from '$widgets/raid-bar/ui/RaidItemChannel.svelte'

	export let raid: RaidData
	export let raidChannels: GameChannel[]
	$: raidTimeByChannel = objectBy(raid.times, (time) => time.channel)
	$: onClickVote = async (raid: RaidData, time: RaidTimeData) => {
		if (!$crrServerType || !$subscribeClientId) {
			throw Error(
				`onClickVote: crrServerType||subscribeClientId(${crrServerType},${subscribeClientId}) is undefined`
			)
		}
		if (time.clientId === $subscribeClientId) {
			alert('내 제보에는 투표할 수 없습니다.')
			return
		}
		const isConfirmed = confirm(
			`이 제보가 맞나요? \n [${GAME_SERVERS[$crrServerType]} 서버] ${raid.name} - [${time.channel}채널] ${timeRemainingString(time.startAt)} 출현`
		)
		if (!isConfirmed) return
		const res = await putRaidTimeVote($subscribeClientId, time.id)
		if ('errorMessage' in res) {
			switch (res.errorMessage) {
				case '이미 투표했습니다.':
					alert('이미 투표했습니다.')
					break
				case '권한이 없습니다.':
					alert('내 제보에는 투표할 수 없습니다.')
					break
				default:
					alert(res.errorMessage)
					break
			}
		} else {
			toast.on('투표가 완료되었습니다!')
		}
	}
</script>

<ul class="flex flex-col gap-4">
	{#each raidChannels as channel (channel)}
		<li class="flex flex-col items-start gap-1.5">
			<RaidItemChannel {channel} />
			{#if raidTimeByChannel[channel] && raidTimeByChannel[channel].length > 0}
				<ol class="flex w-full flex-col gap-2">
					{#each raidTimeByChannel[channel] as time, i}
						<li
							class={cn(
								'rounded-md bg-gray-800',
								i === 0 ? 'border-b border-t border-primary-50/50' : ''
							)}
						>
							<span class="ir">정확도 {i + 1}순위</span>
							<button
								class="flex w-full items-center justify-between px-1.5 py-1.5 text-xs md:p-2"
								title="투표"
								on:click={() => onClickVote(raid, time)}
							>
								<span class="flex-center flex-1">
									<Timer {time} />
								</span>
								<span>
									{time.voteCount + 1}
									<iconify-icon
										icon="fa-solid:vote-yea"
										width={12}
										height={12}
									/>
								</span>
							</button>
						</li>
					{/each}
				</ol>
			{:else}
				<NoData class="w-full leading-none" compact>-</NoData>
			{/if}
		</li>
	{/each}
</ul>
