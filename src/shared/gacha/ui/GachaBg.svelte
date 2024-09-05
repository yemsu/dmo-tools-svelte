<script lang="ts">
	import videoGachaBg from '$lib/images/gacha/videos/gacha-bg.mp4'
</script>

<div class="flex-center">
  <video
    src={videoGachaBg}
    autoplay
    loop
    muted
    playsinline
    class="h-[450px] w-[798px] max-w-none"
  >
    <track kind="captions" />
  </video>
</div>