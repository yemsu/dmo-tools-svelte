<script lang="ts">
	import { cn } from '$shared/lib'

	export let dir: 'hor' | 'ver' = 'hor'

	const dirStyles = {
		hor: 'flex items-center flex-wrap',
		ver: 'flex flex-col justify-center'
	}
</script>

<ul
	{...$$restProps}
	class={cn(
		'min-w-[100px] overflow-hidden rounded-md bg-gray-700 p-0.5 text-xs2 md:p-1 md:text-md',
		dirStyles[dir],
		$$restProps.class
	)}
>
	<slot></slot>
</ul>
