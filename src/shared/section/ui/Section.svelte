<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'flex-col-center w-[400px] max-w-full pb-[2vh] mx-auto',
		md: 'flex flex-col gap-1.5 md:gap-3'
	}
</script>

<section
	class={cn(
		'h-full overflow-hidden px-content-side py-1.5',
		sizeStyles[size],
		className
	)}
	{...restProps}
>
	<slot></slot>
</section>
