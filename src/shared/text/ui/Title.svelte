<script lang="ts">
	import { cn } from '$shared/lib'

	export let tag: string = 'h2'
	export let size: 'sm' | 'md' | 'lg' = 'md'

	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'text-[15px] font-semibold',
		md: 'text-lg md:text-lg2 font-semibold',
		lg: 'text-xl font-semibold'
	}
</script>

<svelte:element
	this={tag}
	class={cn('text-balance break-keep', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</svelte:element>
