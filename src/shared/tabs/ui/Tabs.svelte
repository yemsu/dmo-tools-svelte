<script lang="ts">
	import { cn } from '$shared/lib'
	import type { TabDirection, TabVariants } from '../types'

	export let dir: TabDirection = 'hor'
	export let variant: TabVariants = 'connected'

	const variants = {
		connected: 'rounded-md bg-gray-3 p-0.5 land:p-1 gap-1',
		separated: 'gap-1',
		underline: ''
	}

	const dirStyles = {
		hor: 'flex items-center',
		ver: 'flex flex-col justify-center'
	}
</script>

<ul
	{...$$restProps}
	class={cn(
		'scroll-box flex h-input-h min-w-[100px] text-sub-md land:text-body-md',
		dirStyles[dir],
		variants[variant],
		$$restProps.class
	)}
>
	<slot></slot>
</ul>
