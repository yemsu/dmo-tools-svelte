<script lang="ts">
	import {
		crrServerType,
		deleteRaidTime,
		GAME_SERVERS,
		type GameChannel,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { CONFIRM, TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import { getRemainingTime } from '$shared/time'
	import { toast } from '$shared/toast'

	export let time: RaidTimeData
	export let raidName: RaidData['name']
	export let channel: GameChannel

	const onClick = async () => {
		const isConfirm = confirm(
			CONFIRM.CANCEL_RAID_TIME({
				serverName: GAME_SERVERS[$crrServerType],
				raidName,
				channel,
				minute: getRemainingTime(time.startAt)
			})[$lang]
		)
		if (!isConfirm) return
		await deleteRaidTime(time.id)
		toast.on(TOAST.RAID_TIME_CANCELLED[$lang])
	}
</script>

<button
	class="flex-center button-hover w-full gap-1 border-t border-gray-5 bg-red/50 py-1 text-sub-md"
	title="제보 취소"
	on:click={onClick}
>
	<Icon icon="mdi:close" size="1.2em" />
</button>
