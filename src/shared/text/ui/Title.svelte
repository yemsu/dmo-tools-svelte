<script lang="ts">
	import { cn } from '$shared/lib'

	export let tag: string = 'h2'
	export let size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
	export let weight: 'semibold' | 'bold' | 'extrabold' = 'semibold'

	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		xxs: 'text-body-lg',
		xs: 'text-title-xs',
		sm: 'text-title-sm',
		md: 'text-title-md',
		lg: 'text-title-lg',
		xl: 'text-title-xl'
	}
	const weightStyles = {
		semibold: 'font-semibold',
		bold: 'font-bold',
		extrabold: 'font-extrabold'
	}
</script>

<svelte:element
	this={tag}
	class={cn(
		'text-balance break-keep',
		sizeStyles[size],
		weightStyles[weight],
		className
	)}
	{...restProps}
>
	<slot></slot>
</svelte:element>
