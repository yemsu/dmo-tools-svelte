<script lang="ts">
	import { cn } from '$shared/lib'
	import { Title } from '$shared/text'

	export let href: string
	export let title: string
	export let colorType: 'blue-1' | 'blue-2' | 'blue-3'

	const { class: className, ...restProps } = $$restProps
	const colorTypeStyles = {
		'blue-1': 'text-blue-10 dark:text-blue-6',
		'blue-2': 'text-blue-7 dark:text-blue-9',
		'blue-3': 'text-blue-4 dark:text-blue-12'
	}
</script>

<div
	class={cn(
		'bg-blur-sm relative h-full text-center',
		colorTypeStyles[colorType],
		className
	)}
	{...restProps}
>
	<a
		{href}
		title={`${title} 바로가기`}
		class={cn(
			'flex-center h-full bg-gray-3/50 px-2 land:h-[297px] land:py-8',
			'bg-gradient-to-br from-black/20 via-transparent to-black/20 bg-blend-overlay',
			'border-t-2 border-transparent transition-all',
			'land:hover:-translate-y-10 land:hover:rounded-t-md land:hover:border-current land:hover:bg-gray-3/80',
			'active:-translate-y-10 active:rounded-t-md active:border-current active:bg-gray-3/80'
		)}
	>
		<div class="flex-col-center gap-3">
			<Title size="lg" weight="bold" class="text-primay-30">
				{title}
			</Title>
			<p class="text-balance break-keep text-foreground/70 port:flex-1">
				<slot name="subTitle" />
			</p>
		</div>
	</a>
</div>
