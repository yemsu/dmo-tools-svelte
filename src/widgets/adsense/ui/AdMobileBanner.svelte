<script lang="ts">
	import { cn, intersectionObserver } from '$shared/lib'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'

	let isAdFixed = true

	const handleIntersect = (isIntersecting: boolean) => {
		isAdFixed = !isIntersecting
	}
</script>

<div
	use:intersectionObserver={{
		target: 'footer',
		rootMargin: '60px 0px 0px 0px',
		onIntersect: handleIntersect
	}}
	class={cn(
		'h-[60px] w-full land:hidden',
		isAdFixed ? 'fixed bottom-gnb-h z-header' : 'mt-content-side'
	)}
>
	<Adsense
		adType="top"
		visibleDevice="mobile"
		style="display:inline-block;width:100%;height:60px"
		randomFormat={false}
	/>
</div>
