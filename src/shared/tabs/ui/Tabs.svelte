<script lang="ts">
	import { cn } from '$shared/lib'
	import type { TabDirection, TabVariants } from '../types'

	export let dir: TabDirection = 'hor'
	export let variant: TabVariants = 'connected'
	export let size: 'sm' | 'md' = 'md'

	const variants = {
		connected: 'rounded-md bg-gray-3 p-0.5 land:p-1 gap-1',
		separated: 'gap-1',
		underline: ''
	}

	const dirStyles = {
		hor: 'flex items-center h-input-h [&>li]:h-full [&>li]:flex-1',
		ver: 'flex flex-col justify-center [&>li]:h-input-h-sm'
	}

	const sizeStyles = {
		sm: 'text-sub-md land:text-body-sm',
		md: 'text-sub-lg land:text-body-md'
	}
</script>

<ul
	{...$$restProps}
	class={cn(
		'scroll-box flex min-w-[100px]',
		dirStyles[dir],
		variants[variant],
		sizeStyles[size],
		$$restProps.class
	)}
>
	<slot></slot>
</ul>
