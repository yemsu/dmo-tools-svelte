<script lang="ts">
	import { cn } from '$shared/lib'
	import type { TabDirection } from '../types'

	export let dir: TabDirection = 'hor'

	const dirStyles = {
		hor: 'flex items-center flex-wrap',
		ver: 'flex flex-col justify-center'
	}
</script>

<ul
	{...$$restProps}
	class={cn(
		'text-sub-md2 min-w-[100px] overflow-hidden rounded-md bg-gray-3 p-0.5 md:p-1 md:text-body-md',
		dirStyles[dir],
		$$restProps.class
	)}
>
	<slot></slot>
</ul>
