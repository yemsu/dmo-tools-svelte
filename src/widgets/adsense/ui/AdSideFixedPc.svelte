<script lang="ts">
	import { cn } from '$shared/lib'
	import { AD_SLOTS } from '$widgets/adsense/config'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'

	export let position: 'left' | 'right'

	const positionStyles = {
		left: 'left-[calc(50%-(var(--content-w)/2))] -translate-x-full',
		right: 'right-[calc(50%-(var(--content-w)/2))] translate-x-full'
	}
</script>

<div
	class={cn(
		'fixed top-0 flex h-full w-[clamp(160px,calc((100vw-var(--content-w))/2),500px)] justify-center bg-secondary-30 px-content-side py-header-h',
		positionStyles[position]
	)}
>
	<Adsense adSlot={AD_SLOTS[position]} visibleDevice="pc" />
</div>
