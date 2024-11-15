<script lang="ts">
	import { cn } from '$shared/lib'
	import Title from '$shared/text/ui/Title.svelte'

	export let src: string
	export let href: string
	export let title: string
	export let subTitle: string
	export let xDir: 'left' | 'right'
	export let yDir: 'top' | 'bottom'
	export let colorType: 'primary-30' | 'primary-40' | 'primary-50'

	const { class: className, ...restProps } = $$restProps
	const colorTypeStyles = {
		'primary-30': 'border-primary-30/60 bg-primary-30/20',
		'primary-40': 'border-primary-40/60 bg-primary-40/20',
		'primary-50': 'border-primary-50/60 bg-primary-50/20'
	}
</script>

<div
	class={cn(
		'sm:bg-gr-t lg:rounded-r-none relative w-full overflow-hidden rounded-lg border-b-2 border-t-2',
		yDir === 'top' ? 'md:bg-gr-t' : 'md:bg-gr-b',
		colorTypeStyles[colorType],
		className
	)}
	{...restProps}
>
	<a
		{href}
		class={cn('flex sm:flex-col', xDir === 'left' ? '' : 'justify-end')}
		title={`${title} 바로가기`}
	>
		<div
			class={cn(
				'flex gap-2 px-3 sm:items-center sm:justify-center sm:px-5 sm:py-3 sm:text-center',
				'md:absolute md:top-0 md:h-full md:w-[25%] md:flex-col md:py-10',
				xDir === 'left' ? 'md:right-0' : 'md:left-0 md:text-right ',
				yDir === 'bottom' && 'md:justify-end'
			)}
		>
			<Title size="md" class="text-primay-30 sm:w-[30%] sm:text-md"
				>{title}</Title
			>
			<p class="text-balance break-keep text-xs text-gray-400 sm:flex-1">
				{subTitle}
			</p>
		</div>
		<img {src} alt="" width="600" height="190" />
	</a>
</div>
