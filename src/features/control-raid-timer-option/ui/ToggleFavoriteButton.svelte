<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { raidOption } from '$features/control-raid-timer-option'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { Button } from '$shared/button'
	import { Icon } from '$shared/icon'
	import { TOAST } from '$shared/config'
	import { cn } from '$shared/lib'

	export let raid: RaidData
	$: isActive = $raidOption.favoriteRaidIds?.some(
		(noAlarmRaidId) => +noAlarmRaidId === raid.id
	)

	$: onClick = () => {
		raidOption.toggleFavoriteOption(raid.id)

		const toastType = isActive ? 'OFF_A_FAVORITE' : 'ON_A_FAVORITE'
		toast.on(TOAST.RAID[toastType](raid.name)[$lang])
	}
</script>

<Button
	size="icon"
	variant="ghost"
	class={cn(!isActive && 'opacity-60')}
	title={isActive ? '상단 고정 해제' : '상단 고정'}
	on:click={onClick}
>
	<Icon icon="mdi:star{isActive ? '' : '-outline'}" size="1.1em" />
</Button>
