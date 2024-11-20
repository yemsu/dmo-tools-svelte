<script lang="ts">
	import ChangeAlarmTime from '$features/control-raid-timer-option/ui/ChangeAlarmTime.svelte'
	import { ButtonSkeleton } from '$shared/button'
	import Button from '$shared/button/ui/Button.svelte'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import { Tooltip } from '$shared/tooltip'
	import { onMount } from 'svelte'

	let isNotificationSupported: boolean
	let isNotificationOn: boolean | undefined = undefined

	const askNotificationPermission = () => {
		Notification.requestPermission().then(checkPermission)
	}

	const checkPermission = (permission: NotificationPermission) => {
		if (permission === 'denied' || permission === 'default') {
			isNotificationOn = false
		} else {
			isNotificationOn = true
		}
	}

	onMount(() => {
		if (!('Notification' in window)) {
			isNotificationSupported = false
		} else {
			isNotificationSupported = true
			askNotificationPermission()
			checkPermission(Notification.permission)
		}
	})
</script>

{#if isNotificationOn === false}
	<Button
		size="icon-md"
		variant="warning"
		class={cn($$restProps.class)}
		title="브라우저 알람 받기"
		on:click={askNotificationPermission}
	>
		<Icon icon="icomoon-free:notification" size="1.1em" />
	</Button>
	<Tooltip class="-bottom-2 right-0 translate-y-full">
		<p>
			사이트 알림 권한을 허용하고 <span class="text-point">보스 등장 알림</span
			>을 받아보세요! <br />
			버튼을 클릭해도 권한을 묻는 창이 뜨지 않는다면<br />
			<span class="text-point"
				>주소 표시줄 혹은 사이트 설정에서 권한을 변경</span
			>해주세요.
		</p>
	</Tooltip>
{:else if isNotificationOn === true}
	<ChangeAlarmTime />
{:else}
	<ButtonSkeleton size="icon-md" variant="outline" />
{/if}
