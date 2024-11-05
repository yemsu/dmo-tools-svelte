<script lang="ts">
	import { cn } from '$shared/lib'

	export let icon: string
	export let size: number | null = null
</script>

<iconify-icon
	{...$$restProps}
	{icon}
	width={size || 14}
	height={size || 14}
	class={cn($$restProps.class)}
/>
