<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		putRaidTimeVote,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import Button from '$shared/button/ui/Button.svelte'
	import { cn, timeRemainingString } from '$shared/lib'
	import { toast } from '$shared/toast'

	export let raid: RaidData

	$: onClickVote = async (raid: RaidData, time: RaidTimeData) => {
		if (!$crrServerType) {
			throw Error('onClickVote: crrServerType is undefined')
		}
		const isConfirmed = confirm(
			`이 제보가 맞나요? \n [${GAME_SERVERS[$crrServerType]} 서버] ${raid.name} - [${time.channel}채널] ${timeRemainingString(time.startAt)} 출현`
		)
		if (!isConfirmed) {
			return
		}
		const res = await putRaidTimeVote(time.id)
		if (res) {
			toast.on('투표가 완료되었습니다!')
		}
	}

	const timeDataKeyMaps: { key: keyof RaidTimeData; text: string }[] = [
		{ key: 'channel', text: '채널' },
		{ key: 'startAt', text: '시간' },
		{ key: 'voteCount', text: '투표수' }
	]
</script>

{#if raid.times}
	<ol>
		{#each raid.times as time, i (raid.id + time.id)}
			<li>
				<span class="ir">정확도 {i + 1}순위</span>
				<div class="flex items-center gap-2">
					<dl class="grid flex-1 grid-cols-3 border-b border-gray-700">
						{#each timeDataKeyMaps as timeDataKeyMap (time.id + timeDataKeyMap.key)}
							<div class={cn('text-center')}>
								<dt
									class={cn(
										'bg-gray-700/50 py-1',
										'text-[10px] text-gray-300',
										i !== 0 && 'ir'
									)}
								>
									{timeDataKeyMap.text}
								</dt>
								<dd class="flex-center h-[35px] py-1 text-xs">
									{#if timeDataKeyMap.key === 'startAt'}
										{timeRemainingString(time.startAt)}
									{:else if timeDataKeyMap.key === 'voteCount'}
										<span>
											<Button
												size="sm"
												rounded="md"
												class="bg-primary-30"
												title="투표"
												on:click={() => onClickVote(raid, time)}
											>
												{time[timeDataKeyMap.key] + 1}
												<iconify-icon
													icon="fa-solid:vote-yea"
													width={12}
													height={12}
												/>
											</Button>
										</span>
									{:else}
										{time[timeDataKeyMap.key]}
									{/if}
								</dd>
							</div>
						{/each}
					</dl>
				</div>
			</li>
		{/each}
	</ol>
{/if}
