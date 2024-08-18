<script lang="ts">
	import { cn } from '$shared/lib'
	import { onMount, onDestroy } from 'svelte'
	import { writable } from 'svelte/store'

	// 외부에서 받을 타겟 시간
	export let targetTime: string
	const { class: className, ...restProps } = $$restProps

	const remainingTime = writable('')

	function updateTimer() {
		const bossTime = new Date(targetTime).getTime()
		const currentTime = new Date().getTime()
		const timeDifference = bossTime - currentTime

		if (timeDifference <= 0) {
			remainingTime.set('출현 중')
			clearInterval(timerInterval)
			return
		}

		const hours = Math.floor(timeDifference / (1000 * 60 * 60))
		const minutes = Math.floor(
			(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
		)
		const hourStr = hours > 0 ? `${hours}시간` : ''
		const minuteStr = minutes > 0 ? `${minutes}분` : ''
		const result =
			hours === 0 && minutes === 0 ? '곧 출현' : `${hourStr}${minuteStr} 전`
		remainingTime.set(result)
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
	>{$remainingTime}</span
>
