<script lang="ts">
	import { cn } from '$shared/lib'

	export let compact: boolean = false
	const { class: className, ...restProps } = $$restProps
</script>

<div
	class={cn(
		'flex-col-center flex-1 overflow-hidden rounded-md bg-gray-800 py-10 text-center text-gray-400',
		compact ? 'py-[5px]' : 'py-10',
		className
	)}
	{...restProps}
>
	<p
		class="text-balance break-keep text-xs md:w-[60%] md:min-w-[285px] md:text-md"
	>
		<slot></slot>
	</p>
</div>
