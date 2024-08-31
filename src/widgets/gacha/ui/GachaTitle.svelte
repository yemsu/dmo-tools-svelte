<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className } = $$restProps
</script>

<h2
	class={cn(
		'border-gacha-title w-full border-b border-t py-2 text-center font-ns-bold text-lg',
		className
	)}
>
	<slot></slot>
</h2>
