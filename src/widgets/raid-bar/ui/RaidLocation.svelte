<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'

	export let location: RaidData['location']
	export let size: 'sm' | 'md' = 'sm'

	const sizeStyles = {
		sm: 'text-[10px]',
		md: 'text-xs'
	}
</script>

<span
	class={cn(
		'flex items-center gap-[0.2em] overflow-hidden break-keep leading-[1.2] text-gray-400',
		sizeStyles[size]
	)}
>
	<iconify-icon icon="el:map-marker" width="0.9em" height="0.9em" />
	<span>{location}</span>
</span>
