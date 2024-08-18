<script lang="ts">
	import { cn } from '$shared/lib'

	export let shape: 'square' | 'round' = 'round'
	export let size: 'sm' | 'md' | 'lg' = 'md'
	export let color: 'primary-30' | 'warning' | 'warning-line'
	const { class: className, ...restProps } = $$restProps

	const shapeStyles = {
		square: '',
		round: 'rounded-full'
	}
	const sizeStyles = {
		sm: '',
		md: 'px-1.5 py-0.5 text-xs4 md:px-2 md:text-xs2',
		lg: ''
	}
	const colorStyles = {
		'primary-30': 'bg-primary-30',
		warning: 'bg-warning',
		'warning-line': 'font-semibold text-warning border border-warning'
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
