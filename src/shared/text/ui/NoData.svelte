<script lang="ts">
	import { cn } from '$shared/lib'

	export let compact: boolean = false
	const { class: className, ...restProps } = $$restProps
</script>

<div
	class={cn(
		'flex-col-center flex-1 overflow-hidden rounded-md bg-gray-3 py-10 text-center text-gray-9',
		compact ? 'py-[5px]' : 'py-10',
		className
	)}
	{...restProps}
>
	<p
		class="text-balance break-keep text-sub-md land:w-[60%] land:min-w-[285px] land:text-body-md"
	>
		<slot></slot>
	</p>
</div>
