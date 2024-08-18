<script lang="ts">
	import { cn } from '$shared/lib'

	export let dir: 'hor' | 'ver' = 'hor'
	const { class: className, ...restProps } = $$restProps

	const dirStyles = {
		hor: 'flex items-center flex-wrap h-input-h',
		ver: 'flex flex-col justify-center'
	}
</script>

<menu
	class={cn(
		'md:text-md overflow-hidden rounded-md bg-gray-700 p-1 text-sm',
		dirStyles[dir],
		className
	)}
	{...restProps}
>
	<slot></slot>
</menu>
