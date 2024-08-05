<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' | 'full' = 'md'
	const { class: className, ...restProps } = $$restProps
	const sizeStyles = {
		sm: '',
		md: 'w-[1400px] mx-auto',
		lg: '',
		full: ''
	}
</script>

<div
	class="max-w-full px-4 lg:px-8 {sizeStyles[size]} {className}"
	{...restProps}
>
	<slot></slot>
</div>
