<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<section
	class={cn(
		'flex flex-col gap-2 overflow-hidden bg-secondary-10 md:gap-4 md:rounded-md md:border md:border-secondary-30 md:p-4',
		className
	)}
	{...restProps}
>
	<slot></slot>
</section>
