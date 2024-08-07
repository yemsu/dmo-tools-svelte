<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'px-2 py-1 text-xs',
		md: 'p-2 text-sm md:p-3'
	}
</script>

<div
	class={cn(
		'rounded-md border border-primary-50 bg-primary-10 text-center',
		sizeStyles[size],
		className
	)}
	{...restProps}
>
	<slot></slot>
</div>
