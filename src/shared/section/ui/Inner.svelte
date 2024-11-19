<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'content' | 'full' = 'content'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		content: 'mx-auto w-content-w',
		full: ''
	}
</script>

<div
	class={cn('relative max-w-full px-content-side', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</div>
