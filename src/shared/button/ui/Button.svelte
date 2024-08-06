<script lang="ts">
	import { cn } from '$shared/lib'

	export let isInActive: boolean = false
	export let size: 'sm' | 'md' | 'lg' = 'md'
	const { class: className, ...restProps } = $$restProps

	const sizeSTyles = {
		sm: '',
		md: 'w-[3.5em] px-2 py-1',
		lg: ''
	}
</script>

<button
	class={cn(
		'rounded-full opacity-40 transition-opacity hover:opacity-100',
		'data-[active=true]:border-2 data-[active=true]:opacity-100',
		sizeSTyles[size],
		className
	)}
	{...restProps}
	data-active={!isInActive}
>
	<slot></slot>
</button>
