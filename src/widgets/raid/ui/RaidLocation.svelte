<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'

	export let location: RaidData['location']
</script>

<span
	class={cn(
		'flex items-center gap-[0.2em] overflow-hidden break-keep text-[0.9em] text-gray-9'
	)}
>
	<iconify-icon icon="el:map-marker" width="0.8em" height="0.8em" />
	<span>{location}</span>
</span>
