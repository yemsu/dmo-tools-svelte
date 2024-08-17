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
	class={cn('flex gap-[0.2em] leading-none text-gray-400', sizeStyles[size])}
>
	<iconify-icon
		icon="el:map-marker"
		width="0.9em"
		height="0.9em"
		class="-mb-[1.5px]"
	/>
	<span>{location}</span>
</span>
