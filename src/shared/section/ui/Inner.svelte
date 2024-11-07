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
	class={cn('max-w-full px-content-side', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</div>
