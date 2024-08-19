<script lang="ts">
	import { cn } from '$shared/lib'

	let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'gap-2 md:gap-3',
		md: 'gap-3 md:gap-3'
	}
</script>

<section
	class={cn(
		'flex h-content-fill-h flex-col gap-2 overflow-hidden p-content-side',
		sizeStyles[size],
		className
	)}
	{...restProps}
>
	<slot></slot>
</section>
