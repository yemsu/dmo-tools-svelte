<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'px-2 py-1 text-sub-md',
		md: 'p-1.5 text-sm md:p-3'
	}
</script>

<div
	class={cn('rounded-md bg-gray-3 text-center', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</div>
