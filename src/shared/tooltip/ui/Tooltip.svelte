<script lang="ts">
	import { cn } from '$shared/lib'
</script>

<div
	class={cn(
		'hidden peer-hover:block',
		'absolute -bottom-2 right-0 z-[99] w-[310px]',
		'translate-y-full break-keep rounded-md p-4 pr-2 text-xs ',
		'border border-point/40 bg-black/60 backdrop-blur-sm'
	)}
>
	<slot></slot>
</div>
