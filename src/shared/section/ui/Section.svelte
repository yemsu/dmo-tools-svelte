<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<section
	class={cn(
		'flex flex-col gap-4 overflow-hidden rounded-md border border-secondary-30 bg-secondary-10 p-2 sm:p-4',
		className
	)}
	{...restProps}
>
	<slot></slot>
</section>
