<script lang="ts">
	import { cn } from '$shared/lib'

	export let size: 'sm' | 'md' | 'lg' | 'full' = 'md'
	export let className: string = ''
	const sizeStyles = {
		sm: '',
		md: 'w-[1400px] mx-auto',
		lg: '',
		full: ''
	}
</script>

<div class={cn('max-w-full px-4 lg:px-8', sizeStyles[size], className)}>
	<slot></slot>
</div>
