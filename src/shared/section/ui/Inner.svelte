<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'sm' | 'md' | 'lg' | 'full' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: '',
		md: 'mx-auto',
		lg: '',
		full: ''
	}
</script>

<div
	class={cn('lg:px-8 max-w-full px-4', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</div>
