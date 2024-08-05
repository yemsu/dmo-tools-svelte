<script lang="ts">
	export let tag: string = 'h2'
	export let className: string = ''
	export let size: 'sm' | 'md' | 'lg' = 'md'

	const sizeStyles = {
		sm: '',
		md: 'text-lg',
		lg: ''
	}
</script>

<svelte:element this={tag} class="font-bold {sizeStyles[size]} {className}">
	<slot></slot>
</svelte:element>
