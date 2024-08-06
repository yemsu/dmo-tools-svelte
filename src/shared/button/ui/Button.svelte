<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: Boolean | undefined = undefined
	export let size: 'sm' | 'md' | 'lg' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'px-1 py-1 text-md text-xs',
		md: 'min-w-[3.5em] px-2 py-1 text-md',
		lg: ''
	}
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
</script>

<button
	class={cn(
		'flex-center gap-[0.2em]',
		'rounded-full transition-opacity hover:opacity-80',
		'text-balance break-keep',
		'data-[active=true]:border-2 data-[active=true]:opacity-100 ',
		'data-[active=false]:opacity-40 data-[active=false]:hover:opacity-100',
		sizeStyles[size],
		className
	)}
	on:click
	{...dataActive}
	{...restProps}
>
	<slot></slot>
</button>
