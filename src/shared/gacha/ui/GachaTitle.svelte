<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className } = $$restProps
</script>

<h2
	class={cn(
		'border-gacha-title w-full border-b border-t py-2 text-center font-ns-bold text-body-md land:py-3 land:text-title-sm',
		className
	)}
>
	<slot></slot>
</h2>
