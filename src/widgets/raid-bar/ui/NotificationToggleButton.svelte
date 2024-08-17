<script lang="ts">
	import { Tooltip } from '$shared/tooltip'
	import { onMount } from 'svelte'

	let isNotificationSupported: boolean
	let isNotificationOn: boolean

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
			console.log('지원11')
		} else {
			isNotificationSupported = true
			askNotificationPermission()
			checkPermission(Notification.permission)
		}
	})
</script>

{#if !isNotificationOn}
	<button
		class="peer h-full bg-warning px-2"
		title="브라우저 알람 받기"
		on:click={askNotificationPermission}
	>
		<iconify-icon
			icon="icomoon-free:notification"
			width={15}
			height={15}
			title=""
		/>
	</button>
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
{/if}
