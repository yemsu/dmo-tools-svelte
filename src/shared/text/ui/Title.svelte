<script lang="ts">
	export let tag: string = 'h2'
	export let size: 'sm' | 'md' | 'lg' = 'md'

	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: 'text-sm md:text-md',
		md: 'text-md md:text-lg',
		lg: ''
	}
</script>

<svelte:element
	this={tag}
	class="font-bold {sizeStyles[size]} {className}"
	{...restProps}
>
	<slot></slot>
</svelte:element>
