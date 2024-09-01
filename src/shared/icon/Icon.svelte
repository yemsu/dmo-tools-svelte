<script lang="ts">
	import { cn } from '$shared/lib'

	export let icon: string
	export let size: number | null = null
	const { class: className, ...restProps } = $$restProps
</script>

<iconify-icon
	{icon}
	width={size || 14}
	height={size || 14}
	class={cn(className)}
	{...restProps}
/>
