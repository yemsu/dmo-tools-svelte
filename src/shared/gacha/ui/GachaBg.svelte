<script lang="ts">
	import videoGachaBg from '$lib/images/gacha/videos/gacha-bg.mp4'
</script>

<div class="flex-center absolute size-full">
	<video
		src={videoGachaBg}
		autoplay
		loop
		muted
		playsinline
		class="size-gacha-video max-w-none"
	>
		<track kind="captions" />
	</video>
</div>
