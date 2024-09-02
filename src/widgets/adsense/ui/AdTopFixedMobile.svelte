<script lang="ts">
	import { cn } from '$shared/lib'
	import { AD_SLOTS } from '$widgets/adsense/config'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
</script>

<div class={cn('h-[80px] w-full justify-center bg-secondary-30')}>
	<Adsense adSlot={AD_SLOTS.top} visibleDevice="mobile" />
</div>
