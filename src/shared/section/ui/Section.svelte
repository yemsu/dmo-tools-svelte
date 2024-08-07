<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<section
	class={cn('flex flex-col gap-3 overflow-hidden md:gap-4', className)}
	{...restProps}
>
	<slot></slot>
</section>
