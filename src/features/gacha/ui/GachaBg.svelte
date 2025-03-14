<script lang="ts">
	import { contentUrl } from '$shared/lib'
</script>

<div class="flex-center absolute size-full">
	<video
		src={contentUrl('/gacha/videos/gacha-bg.mp4')}
		autoplay
		loop
		muted
		playsinline
		class="size-full max-w-none object-contain"
	>
		<track kind="captions" />
	</video>
</div>
