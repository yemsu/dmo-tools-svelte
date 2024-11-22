<script lang="ts">
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
</script>

<div class="flex flex-1 flex-col land:pr-side-ad-w">
	<Inner class="flex flex-1 flex-col pb-content-side land:pt-header-h">
		<slot />
	</Inner>
</div>

<Adsense
	adType="left"
	visibleDevice="pc"
	class={cn(
		'fixed flex w-side-ad-w justify-center',
		'right-0 top-0 h-[30vh] overflow-hidden',
		'port:hidden'
	)}
/>
<Adsense
	adType="right"
	visibleDevice="pc"
	class={cn(
		'fixed flex w-side-ad-w justify-center',
		'bottom-0 right-0 h-[70vh] overflow-hidden',
		'port:hidden'
	)}
/>
