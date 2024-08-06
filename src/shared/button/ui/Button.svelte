<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: Boolean | undefined = undefined
	export let rounded: 'full' | 'md' = 'full'
	export let size: 'sm' | 'md' | 'lg' = 'md'
	const { class: className, ...restProps } = $$restProps
	const shapeStyles = {
		full: 'rounded-full',
		md: 'rounded-md'
	}
	const sizeStyles = {
		sm: 'px-1 py-1 text-md text-xs',
		md: 'min-w-[3.5em] px-2 py-1 text-md',
		lg: 'px-[0.8em] py-[0.5em] text-md'
	}
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
</script>

<button
	class={cn(
		'flex-center gap-[0.2em]',
		'transition-opacity hover:opacity-80',
		'text-balance break-keep',
		isActive === true && 'border-2 opacity-100 ',
		isActive === false && 'opacity-40 hover:opacity-100',
		shapeStyles[rounded],
		sizeStyles[size],
		className
	)}
	on:click
	{...dataActive}
	{...restProps}
>
	<slot></slot>
</button>
