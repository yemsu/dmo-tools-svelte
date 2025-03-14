<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { raidOption } from '../model/raidOption'
	import { Button } from '$shared/button'
	import { TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'

	export let raid: RaidData
	$: isInactive = $raidOption.noAlarmRaidIds?.some(
		(noAlarmRaidId) => +noAlarmRaidId === raid.id
	)

	$: onClick = () => {
		raidOption.toggleAlarmOption(raid.id)

		const toastType = !isInactive ? 'OFF_A_ALARM' : 'ON_A_ALARM'
		toast.on(TOAST.RAID[toastType](raid.name)[$lang])
	}
</script>

<Button
	size="icon"
	variant="ghost"
	class={cn(isInactive && 'opacity-60')}
	title={isInactive ? '알림 받기' : '알림 받지 않기'}
	on:click={onClick}
>
	<Icon icon="mdi:alarm{isInactive ? '-off' : '-check'}" size="1.1em" />
</Button>
