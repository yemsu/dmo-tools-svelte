<script lang="ts">
	import { cn } from '$shared/lib'

	const { class: className, ...restProps } = $$restProps
</script>

<section
	class={cn('flex flex-col gap-4 overflow-hidden', className)}
	{...restProps}
>
	<slot></slot>
</section>
