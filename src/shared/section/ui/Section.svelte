<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<section
	class={cn(
		'border-secondary-30 bg-secondary-10 flex flex-col gap-4 rounded-md border p-2 sm:p-4',
		className
	)}
	{...restProps}
>
	<slot></slot>
</section>
