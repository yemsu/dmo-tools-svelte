<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'

	export let location: RaidData['location']
	export let size: 'sm' | 'md' = 'md'

	const sizeStyles = {
		sm: 'text-sub-sm',
		md: 'text-sub-md'
	}
</script>

<span
	class={cn(
		'flex items-center gap-[0.2em] overflow-hidden break-keep leading-none text-gray-9',
		sizeStyles[size]
	)}
>
	<iconify-icon icon="el:map-marker" width="0.8em" height="0.8em" />
	<span>{location}</span>
</span>
