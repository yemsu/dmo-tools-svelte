<script lang="ts">
	import { cn } from '$shared/lib'

	export let icon: string
	export let size: number | string | null = null
</script>

<iconify-icon
	{...$$restProps}
	{icon}
	width={size || '1.2em'}
	height={size || '1.2em'}
	class={cn($$restProps.class)}
/>
