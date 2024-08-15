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
	import RaidItemTime from '$widgets/raid-bar/ui/RaidItemTime.svelte'

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
</script>

{#if raid.times}
	<ol>
		{#each raid.times as time, i (raid.id + time.id)}
			<li>
				<span class="ir">정확도 {i + 1}순위</span>
				<button
					class="flex w-full items-center justify-between rounded-md bg-gray-800 px-1.5 py-2 text-xs md:p-2"
					title="투표"
					on:click={() => onClickVote(raid, time)}
				>
					<RaidItemTime {time} />
					<span>
						{time.voteCount + 1}
						<iconify-icon icon="fa-solid:vote-yea" width={12} height={12} />
					</span>
				</button>
			</li>
		{/each}
	</ol>
{/if}
