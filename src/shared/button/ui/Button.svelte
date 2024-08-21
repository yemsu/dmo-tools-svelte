<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: Boolean | undefined = undefined
	export let rounded: 'full' | 'md' = 'full'
	export let size: 'icon' | 'sm' | 'md' | 'lg' = 'md'
	export let disabled: boolean | undefined = undefined
	const { class: className, ...restProps } = $$restProps
	const shapeStyles = {
		full: 'rounded-full',
		md: 'rounded-md'
	}
	const sizeStyles = {
		icon: 'w-[1.5em] h-[1.5em] flex-center',
		sm: 'px-2 py-1 text-xs',
		md: 'min-w-[3.5em] px-2 py-1 text-md',
		lg: 'px-[0.8em] py-[0.5em] text-md min-w-[5em] h-input-h'
	}
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
</script>

<button
	class={cn(
		'flex-center gap-[0.2em]',
		!disabled && 'transition-opacity hover:opacity-80',
		'text-balance break-keep disabled:bg-gray-500 disabled:text-gray-300',
		isActive === true && 'border-2 opacity-100 ',
		isActive === false && 'opacity-40 hover:opacity-100',
		shapeStyles[rounded],
		sizeStyles[size],
		className
	)}
	{disabled}
	on:click
	{...dataActive}
	{...restProps}
>
	<slot></slot>
</button>
