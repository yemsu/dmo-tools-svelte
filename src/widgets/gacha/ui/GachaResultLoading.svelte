<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import { cn, contentUrl } from '$shared/lib'
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

	const videoNumber = () => {
		const maxRarity = Math.max(
			...$gachaStore.results.map(({ rarity }) => rarity)
		)
		switch (maxRarity) {
			case 3:
			case 4:
				return 3
			case 5:
				return 5
			case 6:
				return 6
			case 7:
				return 7
			default:
				return 1
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
	<div class="relative w-full overflow-hidden">
		<div class="flex-center">
			<video
				bind:this={videoElement}
				src={contentUrl(`/gacha/videos/loading-rarity-${videoNumber()}.mp4`)}
				class="pc:size-full size-gacha-video max-w-none"
				playsinline
			>
				<track kind="captions" />
			</video>
		</div>
		<button
			class="bg-gacha-skip-loading text-sub-md absolute right-3 top-4 w-[80px] py-1.5 md:top-2"
			on:click={onVideoEnd}
		>
			SKIP
		</button>
	</div>
</div>
