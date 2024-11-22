<script lang="ts">
	import { cn } from '$shared/lib'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
</script>

<div class={cn('h-mobile-bottom-ad-h fixed bottom-0 w-full land:hidden')}>
	<Adsense
		adType="top"
		visibleDevice="mobile"
		style="display:inline-block;width:100%;height:60px"
		randomFormat={false}
	/>
</div>
