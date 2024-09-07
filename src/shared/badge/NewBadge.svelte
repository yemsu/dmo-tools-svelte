<script>
	import { cn } from '$shared/lib'
	const { class: className } = $$restProps
</script>

<span
	class={cn(
		'flex-center absolute right-0 top-0 -translate-y-[40%] translate-x-[120%]',
		'aspect-square w-[1.5em]',
		'bg-red rounded-full text-[6px] text-gray-200 md:text-[8px]',
		className
	)}
>
	N
</span>
