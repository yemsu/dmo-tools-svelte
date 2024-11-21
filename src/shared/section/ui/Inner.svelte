<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'content' | 'full' | 'content-middle' = 'content'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		content: 'mx-auto w-content-w',
		'content-middle': 'mx-auto max-w-full w-[450px] pb-[15%] ',
		full: ''
	}
</script>

<div
	class={cn('relative max-w-full px-content-side', sizeStyles[size], className)}
	{...restProps}
>
	<slot></slot>
</div>
