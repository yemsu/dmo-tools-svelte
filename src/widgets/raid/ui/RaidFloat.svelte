<script lang="ts">
	import {
		crrServerType,
		disSubscribe,
		GAME_SERVERS,
		getRaids,
		raids,
		selectedRaidTab,
		subscribeClientId
	} from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Inner } from '$shared/section'
	import FloatModal from '$widgets/raid/ui/FloatModal.svelte'
	import { onMount } from 'svelte'
	import { RaidBar } from '$widgets/raid-bar'

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
		console.log('eventSource', eventSource, $subscribeClientId)
		if (eventSource && $subscribeClientId) {
			console.log('$subscribeClientId', $subscribeClientId)
			eventSource.close()
			eventSource = undefined
			return await disSubscribe($subscribeClientId)
		}
	}

	const handleEventSource = async (eventSource: EventSource) => {
		if (eventSource.readyState === EventSource.CONNECTING) {
			console.log('SSE is connecting...')
		} else if (eventSource.readyState === EventSource.OPEN) {
			console.log('SSE connection is open')
		} else if (eventSource.readyState === EventSource.CLOSED) {
			console.log('SSE connection is closed')
		}
		eventSource.addEventListener('sub', function (e) {
			const data = JSON.parse(e.data)
			console.log('sub!!! ', data)
			subscribeClientId.set(data.clientId)
		})
		eventSource.addEventListener('created', function (e) {
			const data = JSON.parse(e.data)
			console.log('created!!!', data)
		})
		eventSource.addEventListener('voted', function (e) {
			const data = JSON.parse(e.data)
			console.log('voted!!!', data)
		})
		eventSource.addEventListener('removed', function (e) {
			const data = JSON.parse(e.data)
			console.log('removed!!!', data)
		})
		eventSource.addEventListener('notify', function (e) {
			const data = JSON.parse(e.data)
			console.log('notify!!!', data)
		})
		eventSource.addEventListener('error', function (e) {
			console.error('error occurred', e)
		})
	}

	const subscribeSSE = async () => {
		checkSseSupported()
		await clearPrevSubscribe()
		eventSource = new EventSource(
			`${API_BASE_URL}/alarms/subscribe/${$crrServerType}`
		)
		handleEventSource(eventSource)
	}

	const onChangeCrrServerType = async () => {
		if (!$crrServerType) return

		const raidsFetched = await getRaids($crrServerType)
		raids.set(raidsFetched)
		selectedRaidTab.set(raidsFetched[0])
		console.log('raidsFetched', raidsFetched)
		// const sorted = allRaidTimers.sort((a, b) => {
		// 	const dateA = new Date(a.startAt)
		// 	const dateB = new Date(b.startAt)
		// 	return dateA.getTime() - dateB.getTime()
		// })
		// console.log('allRaidTimers', sorted[0])
		subscribeSSE()
	}

	onMount(async () => {
		crrServerType.set(_objKeys(GAME_SERVERS)[0])
	})

	$: $crrServerType && onChangeCrrServerType()
</script>

<aside class="z-[99]">
	<h2 class="ir">레이드 타이머</h2>
	<Inner class="w-full">
		{#if isModalOn}
			<Inner class="absolute left-0 top-0 z-[99] size-full overflow-hidden">
				<FloatModal />
				<button class="absolute right-4 top-4" on:click={toggleIsModalOn}
					>닫기</button
				>
			</Inner>
		{/if}
		{#if $raids.length > 0}
			<RaidBar on:click={toggleIsModalOn} />
		{/if}
	</Inner>
</aside>
