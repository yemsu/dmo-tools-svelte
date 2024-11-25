<script lang="ts">
	import {
		deleteRaidTime,
		raids,
		type RaidData,
		type RaidTimeData
	} from '$entities/raid'
	import { Button } from '$shared/button'
	import { CONFIRM, TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'

	export let time: RaidTimeData

	const onClick = async () => {
		const isConfirm = confirm(CONFIRM.CANCEL_RAID_TIME[$lang])
		if (!isConfirm) return
		await deleteRaidTime(time.id)
		raids.removeChannelTimes(time)
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
