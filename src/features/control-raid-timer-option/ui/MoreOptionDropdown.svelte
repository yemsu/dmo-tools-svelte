<script lang="ts">
	import { lang } from '$shared/model'
	import { raids } from '$entities/raid'
	import { raidOption } from '$features/control-raid-timer-option'
	import { Button } from '$shared/button'
	import { TOAST } from '$shared/config'
	import { Dropdown } from '$shared/dropdown'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
	import { toast } from '$shared/toast'

	let isInactive = true

	$: onClick = () => {
		// raidOption.toggleAlarmOption(raid.id)
		// const toastType = !isInactive ? 'OFF_A_ALARM' : 'ON_A_ALARM'
		// toast.on(TOAST.RAID[toastType](raid.name)[$lang])
	}

	$: onClickAllAlarmOn = () => {
		raidOption.allAlarmOn()
		toast.on(TOAST.RAID.ON_ALL_ALARM[$lang])
	}
	const onClickAllAlarmOff = () => {
		raidOption.allAlarmOff($raids)
		toast.on(TOAST.RAID.OFF_ALL_ALARM[$lang])
	}
	const onClickAllFavoriteOn = () => {
		raidOption.allFavoriteOn($raids)
		toast.on(TOAST.RAID.ON_ALL_FAVORITE[$lang])
	}
	const onClickAllFavoriteOff = () => {
		raidOption.allFavoriteOff()
		toast.on(TOAST.RAID.OFF_ALL_FAVORITE[$lang])
	}

	$: tabs = [
		{
			icon: 'mdi:alarm-check',
			text: '일괄 알림 ON',
			onClick: onClickAllAlarmOn
		},
		{
			icon: 'mdi:alarm-off',
			text: '일괄 알림 OFF',
			onClick: onClickAllAlarmOff
		},
		{ icon: 'mdi:star', text: '일괄 상단고정', onClick: onClickAllFavoriteOn },
		{
			icon: 'mdi:star-outline',
			text: '일괄 상단고정 해재',
			onClick: onClickAllFavoriteOff
		}
	]
</script>

<Dropdown menuBoxAlign="right">
	<Button
		slot="buttonSlot"
		size="icon-md"
		variant="outline"
		class={cn(isInactive && 'opacity-60')}
		title="옵션 더보기"
		let:toggleDropdown
		on:click={toggleDropdown}
	>
		<Icon icon="carbon:overflow-menu-vertical" size="1.5em" />
	</Button>
	<Tabs slot="contentSlot" dir="ver" size="sm">
		{#each tabs as tab (tab.icon)}
			<Tab class="w-full" on:click={tab.onClick}>
				<span class="flex w-full gap-[0.5em]">
					<Icon icon={tab.icon} />
					{tab.text}
				</span>
			</Tab>
		{/each}
	</Tabs>
</Dropdown>
