<script lang="ts">
	import { alarmMinute } from '$entities/raid'
	import { Tab, Tabs } from '$shared/tabs'
	import { Tooltip } from '$shared/tooltip'
	import { onMount } from 'svelte'

	let isNotificationSupported: boolean
	let isNotificationOn: boolean
	let isTabOpen: boolean

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

	const onClickTab = (alarmMinuteOption: number) => {
		alarmMinute.set(alarmMinuteOption)
		isTabOpen = false
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
{:else}
	<button
		class="bg-primary-35 relative h-full px-2"
		title="알림 타이머 설정"
		on:click={() => (isTabOpen = !isTabOpen)}
	>
		<iconify-icon icon="majesticons:timer" width={16} height={16} />
		<span
			class="absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-[52%] rounded-full bg-white text-xs3 font-extrabold leading-none tracking-[-0.1em] text-primary-30"
			>{$alarmMinute}</span
		>
	</button>
	{#if isTabOpen}
		<Tabs
			dir="ver"
			class="absolute bottom-0 right-0 w-[100px] translate-y-full border border-primary-50/50 drop-shadow-primary-50"
		>
			{#each [1, 3, 5, 10] as alarmMinuteOption (alarmMinuteOption)}
				<Tab
					isActive={alarmMinuteOption === $alarmMinute}
					on:click={() => onClickTab(alarmMinuteOption)}
				>
					{alarmMinuteOption}분 전
				</Tab>
			{/each}
		</Tabs>
	{/if}
{/if}
