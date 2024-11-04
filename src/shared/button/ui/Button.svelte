<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: Boolean | undefined = undefined
	export let rounded: 'full' | 'md' = 'full'
	export let size: 'icon' | 'sm' | 'md' | 'md-lg' | 'lg' = 'md'
	export let disabled: boolean | undefined = undefined
	const { class: className, ...restProps } = $$restProps
	const shapeStyles = {
		full: 'rounded-full',
		md: 'rounded-md'
	}
	const sizeStyles = {
		icon: 'p-2 flex-center',
		sm: 'px-2 py-1 text-xs',
		md: 'min-w-[3.5em] px-2 py-1 text-xs md:text-md',
		'md-lg': 'min-w-[3.5em] h-[30px] px-2 text-xs md:text-md',
		lg: 'px-[1em] py-[0.5em] text-xs md:text-md min-w-[5em] h-input-h'
	}
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
</script>

<button
	class={cn(
		'flex-center gap-[0.2em] leading-none',
		!disabled && 'button-hover',
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
