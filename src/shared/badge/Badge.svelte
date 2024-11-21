<script lang="ts">
	import { cn } from '$shared/lib'

	export let shape: 'square' | 'round' = 'round'
	export let size: 'sm' | 'md' | 'lg' = 'md'
	export let color:
		| 'blue'
		| 'warning'
		| 'warning-line'
		| 'reverse'
		| 'gray'
		| 'custom'
	const { class: className, ...restProps } = $$restProps

	const shapeStyles = {
		square: '',
		round: 'rounded-full'
	}
	const sizeStyles = {
		sm: 'px-1.5 py-0.5 text-sub-sm',
		md: 'py-[0.3em] text-sub-lg px-[0.7em] land:text-sub-md2',
		lg: ''
	}
	const colorStyles = {
		blue: 'bg-blue-6 text-white',
		reverse: 'bg-gray-12 text-gray-1 dark:font-bold',
		gray: 'bg-gray-5',
		warning: 'bg-warning text-white',
		'warning-line': 'font-semibold text-warning border border-warning',
		custom: ''
	}
</script>

<span
	class={cn(
		shapeStyles[shape],
		sizeStyles[size],
		colorStyles[color],
		className
	)}
	{...restProps}
>
	<slot></slot>
</span>
