<script lang="ts">
	import loadingVideo1 from '$lib/images/gacha/videos/loading-rarity-1.mp4'
	import loadingVideo3 from '$lib/images/gacha/videos/loading-rarity-3.mp4'
	import loadingVideo5 from '$lib/images/gacha/videos/loading-rarity-5.mp4'
	import loadingVideo6 from '$lib/images/gacha/videos/loading-rarity-6.mp4'
	import loadingVideo7 from '$lib/images/gacha/videos/loading-rarity-7.mp4'
	import { gachaStore } from '$entities/gacha'
	import { cn } from '$shared/lib'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'

	let isVideoFadeOut = false
	let videoElement: HTMLVideoElement

	const dispatch = createEventDispatcher()

	const onVideoEnd = () => {
		isVideoFadeOut = true
		setTimeout(() => {
			dispatch('endVideo', true)
			isVideoFadeOut = false
		}, 500)
	}

	const videoSrc = () => {
		const maxRarity = Math.max(
			...$gachaStore.results.map(({ rarity }) => rarity)
		)
		switch (maxRarity) {
			case 3:
			case 4:
				return loadingVideo3
			case 5:
				return loadingVideo5
			case 6:
				return loadingVideo6
			case 7:
				return loadingVideo7
			default:
				return loadingVideo1
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onVideoEnd()
		}
	}

	onMount(() => {
		document.addEventListener('keyup', onKeyUp)
		videoElement.play()
		videoElement.addEventListener('ended', onVideoEnd)
	})

	onDestroy(() => {
		document.removeEventListener('keyup', onKeyUp)
	})
</script>

<div
	class={cn(
		'flex-col-center absolute left-0 top-0 z-20 size-full bg-black transition-all duration-500',
		isVideoFadeOut && 'scale-150 opacity-0 blur-xl'
	)}
>
	<div class="relative w-full">
		<video bind:this={videoElement} src={videoSrc()} class="size-full">
			<track kind="captions" />
		</video>
		<button
			class="bg-gacha-skip-loading absolute right-3 top-2 w-[80px] py-1.5 text-xs"
			on:click={onVideoEnd}
		>
			SKIP
		</button>
	</div>
</div>
