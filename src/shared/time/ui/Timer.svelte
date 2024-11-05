<script lang="ts">
	import { raids, type RaidTimeData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { onDestroy, onMount } from 'svelte'
	import { getRemainingTime } from '../lib'

	// 외부에서 받을 타겟 시간
	export let time: RaidTimeData
	$: targetTime = time?.startAt
	const { class: className, ...restProps } = $$restProps

	let remainingTime = ''

	function updateTimer() {
		remainingTime = getRemainingTime(targetTime)
		if (remainingTime === '출현 중') {
			raids.removeTime(time)
			clearInterval(timerInterval)
		}
	}

	let timerInterval: NodeJS.Timeout

	onMount(() => {
		updateTimer()
		timerInterval = setInterval(updateTimer, 1000)
	})

	onDestroy(() => {
		clearInterval(timerInterval)
	})
</script>

<!-- 타이머 출력 -->
<span class={cn('text-xs2 text-point md:text-xs', className)} {...restProps}
	>{remainingTime}</span
>
