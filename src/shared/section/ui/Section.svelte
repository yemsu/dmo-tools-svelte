<script lang="ts">
	import { cn } from '$shared/lib'

	export let className: string = ''
</script>

<section
	class={cn(
		'flex flex-col gap-4 rounded-md border border-gray-600 p-2 sm:p-4',
		className
	)}
>
	<slot></slot>
</section>
