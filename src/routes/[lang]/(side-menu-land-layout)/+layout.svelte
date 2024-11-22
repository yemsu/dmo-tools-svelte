<script lang="ts">
	import { cn } from '$shared/lib'
	import { Adsense } from '$widgets/adsense'
</script>

<div class="flex flex-1 flex-col land:pb-bottom-ad-h">
	<slot />
</div>
<Adsense
	adType="left"
	visibleDevice="pc"
	class={cn(
		'fixed flex h-bottom-ad-h justify-center',
		'bottom-0 right-0 w-[calc((100vw-var(--side-menu-w))*0.6)] overflow-hidden',
		'port:hidden'
	)}
/>
<Adsense
	adType="right"
	visibleDevice="pc"
	class={cn(
		'fixed flex h-bottom-ad-h justify-center',
		'bottom-0 left-side-menu-w w-[calc((100vw-var(--side-menu-w))*0.4)] overflow-hidden',
		'port:hidden'
	)}
/>
