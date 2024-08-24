<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<iconify-icon
	icon="line-md:chevron-triple-right"
	width={12}
	height={12}
	class={cn('-mb-[2px] text-gray-300', className)}
/>
