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

	let isModalOn = false
	let eventSource: EventSource | undefined
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

	const toggleIsModalOn = () => {
		isModalOn = !isModalOn
	}

	const checkSseSupported = () => {
		//브라우저가 SSE지원하는지 체크
		if (typeof EventSource !== 'undefined') {
			console.log('sse지원')
		} else {
			console.log('sse미지원')
			return
		}
	}

	$: clearPrevSubscribe = async () => {
		if (!eventSource || !$subscribeClientId) return
		console.log(
			'clearPrevSubscribe eventSource',
			eventSource,
			$subscribeClientId
		)
		eventSource.close()
		eventSource = undefined
		return await disSubscribe($subscribeClientId)
	}

	const handleEventSource = async (_eventSource: EventSource) => {
		console.log('new SSE', eventSource)
		_eventSource.addEventListener('sub', function (e) {
			const data = JSON.parse(e.data)
			console.log('sub!!! ', data)
			subscribeClientId.set(data.clientId)
		})
		_eventSource.addEventListener('created', function (e) {
			const createdTime = JSON.parse(e.data) as RaidTimeData
			console.log('created!!!', createdTime)
			raids.addNewTime(createdTime)
		})
		_eventSource.addEventListener('voted', function (e) {
			const votedTime = JSON.parse(e.data)
			raids.voteTime(votedTime)
		})
		_eventSource.addEventListener('removed', function (e) {
			const removedTime = JSON.parse(e.data)
			raids.removeTime(removedTime)
		})
		_eventSource.addEventListener('notify', function (e) {
			const data = JSON.parse(e.data)
			console.log('notify!!!', data)
		})
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

<aside class="z-[99]">
	<h2 class="ir">레이드 타이머</h2>
	<Inner class="w-full">
		{#if isModalOn}
			<Inner
				class="absolute left-0 top-0 z-[99] size-full overflow-hidden py-content-side"
			>
				<FloatModal />
				<button class="absolute right-4 top-4" on:click={toggleIsModalOn}
					>닫기</button
				>
			</Inner>
		{/if}
		<RaidBar on:click={toggleIsModalOn} />
	</Inner>
</aside>
