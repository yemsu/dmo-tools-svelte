<script lang="ts">
	import {
		type GameChannel,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { user } from '$entities/user'
	import { LikeRaidTimeButton } from '$features/raid/like-raid-time'
	import { DeleteRaidTimeButton } from '$features/raid/update-raid-time'
	import RaidInformant from '$features/raid/display-raid-info/ui/RaidInformant.svelte'

	export let raid: RaidData
	export let channel: GameChannel
	export let time: RaidTimeData
</script>

<div class="flex">
	<LikeRaidTimeButton {raid} {time} />
	<div
		class="flex items-center gap-1 p-2 land:w-[50%] land:min-w-[11em] land:shrink-0"
		data-id={time.id}
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
