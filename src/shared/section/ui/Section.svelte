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
	class={cn('flex flex-col overflow-hidden', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</section>
