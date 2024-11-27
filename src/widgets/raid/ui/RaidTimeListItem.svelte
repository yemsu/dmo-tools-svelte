<script lang="ts">
	import {
		type GameChannel,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { user } from '$entities/user'
	import { LikeRaidTimeButton } from '$features/like-raid-time'
	import { DeleteRaidTimeButton } from '$features/update-raid-time'
	import RaidInformant from '$widgets/raid/ui/RaidInformant.svelte'

	export let raid: RaidData
	export let channel: GameChannel
	export let time: RaidTimeData
</script>

<div class="rounded-md border border-gray-5">
	<div class="flex">
		<LikeRaidTimeButton {raid} {time} />
		<div
			class="flex items-center gap-1 p-2 land:w-[50%] land:min-w-[11em] land:shrink-0"
		>
			<RaidInformant {time} class="flex-1 justify-center" />
		</div>
	</div>

	{#if $user && $user.nickname === time.user?.nickname}
		<DeleteRaidTimeButton
			{time}
			{channel}
			raidName={raid.name}
			class="w-full rounded-t-none border-t border-gray-5"
		/>
	{/if}
</div>
