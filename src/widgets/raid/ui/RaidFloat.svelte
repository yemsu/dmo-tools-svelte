<script lang="ts">
	import {
		crrServerType,
		disSubscribe,
		GAME_SERVERS,
		getRaids,
		raids,
		selectedRaidId,
		subscribeClientId,
		type RaidTimeData,
		type ServerType
	} from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { RaidBar } from '$widgets/raid-bar'
	import FloatModal from '$widgets/raid/ui/FloatModal.svelte'
	import { onMount } from 'svelte'

	let isSseSupported: boolean | undefined = undefined
	let isModalOn = false
	let eventSource: EventSource | undefined
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	const toggleIsModalOn = () => {
		isModalOn = !isModalOn
	}

	const checkSseSupported = () => {
		if (typeof EventSource !== 'undefined') {
			isSseSupported = true
		} else {
			isSseSupported = false
			return
		}
	}

	$: clearPrevSubscribe = async () => {
		if (!eventSource || !$subscribeClientId) return
		eventSource.close()
		eventSource = undefined
		return await disSubscribe($subscribeClientId)
	}

	const handleEventSource = async (_eventSource: EventSource) => {
		_eventSource.addEventListener('sub', function (e) {
			const data = JSON.parse(e.data)
			console.log('subscribe')
			subscribeClientId.set(data.clientId)
		})
		_eventSource.addEventListener('created', function (e) {
			const createdTime = JSON.parse(e.data) as RaidTimeData
			console.log('created')
			raids.addNewTime(createdTime)
		})
		_eventSource.addEventListener('voted', function (e) {
			const votedTime = JSON.parse(e.data)
			raids.voteTime(votedTime)
		})
		// _eventSource.addEventListener('notify', function (e) {
		// 	const data = JSON.parse(e.data)
		// 	console.log('notify')
		// })
		_eventSource.addEventListener('error', function (e) {
			console.error('error occurred', e)
		})
	}

	const subscribeSSE = async (serverType: ServerType) => {
		const ipRes = await fetch('https://ipinfo.io/json?token=d49252de2b4da0')
		if (!ipRes.ok) {
			throw Error(`HTTP error! get ip Failed! ${ipRes.status}`)
		}
		const data: { ip: string } = await ipRes.json()

		checkSseSupported()
		await clearPrevSubscribe()
		eventSource = new EventSource(
			`${API_BASE_URL}/alarms/subscribe/${serverType}?ipAddress=${data.ip}`
		)
		handleEventSource(eventSource)
	}

	$: onChangeCrrServerType = async (serverType: ServerType | undefined) => {
		if (!serverType) return
		const raidsFetched = await getRaids(serverType)
		raids.set(raidsFetched)
		selectedRaidId.set(raidsFetched[0].id)
		subscribeSSE(serverType)
	}

	onMount(async () => {
		crrServerType.loadSavedData(_objKeys(GAME_SERVERS)[0])
	})

	$: $crrServerType && onChangeCrrServerType($crrServerType)
</script>

<aside class="z-raidBar">
	<h2 class="ir">레이드 타이머</h2>
	<Inner class="w-full">
		{#if isModalOn}
			<div class="z-modal absolute left-0 top-0 size-full overflow-hidden p-2">
				<FloatModal />
				<button
					class="absolute right-2 top-3 p-2 md:right-4 md:top-5"
					on:click={toggleIsModalOn}
					title="닫기"
				>
					<iconify-icon icon="mdi:close" width={25} height={25} />
				</button>
			</div>
		{/if}
		<RaidBar on:click={toggleIsModalOn} {isSseSupported} />
	</Inner>
</aside>
