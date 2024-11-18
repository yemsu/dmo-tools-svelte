<script lang="ts">
	import { cn } from '$shared/lib'
	import Title from '$shared/text/ui/Title.svelte'

	export let src: string
	export let href: string
	export let title: string
	export let xDir: 'left' | 'right'
	export let yDir: 'top' | 'bottom'
	export let colorType: 'blue-1' | 'blue-2' | 'blue-3'
	$: isLeft = xDir === 'left'
	$: isTop = yDir === 'top'

	const { class: className, ...restProps } = $$restProps
	const colorTypeStyles = {
		'blue-1':
			'border-blue-7/60 dark:border-blue-6/60 dark:bg-blue-6/20 bg-blue-7/20',
		'blue-2':
			'border-blue-5/60 dark:border-blue-9/60 dark:bg-blue-9/20 bg-blue-5/20',
		'blue-3':
			'border-blue-3/60 dark:border-blue-12/60 dark:bg-blue-12/20 bg-blue-3/20'
	}
</script>

<div
	class={cn(
		'relative w-full overflow-hidden rounded-lg border-b-2 border-t-2 lg:rounded-r-none',
		colorTypeStyles[colorType],
		className
	)}
	{...restProps}
>
	<a
		{href}
		class={cn('flex sm:flex-col', isLeft ? '' : 'justify-end')}
		title={`${title} 바로가기`}
	>
		<div
			class={cn(
				'flex-center gap-2 sm:py-4',
				'md:absolute md:top-0 md:h-full',
				isLeft
					? 'md:right-0 md:w-[26%] md:pl-6'
					: 'md:left-0 md:w-[28%] md:pl-2 md:pr-8 md:text-right',
				!isTop && 'md:justify-end'
			)}
		>
			<div class="flex gap-2 md:flex-col">
				<Title size="sm" weight="bold" class="text-primay-30">
					{title}
				</Title>
				<p class="text-body-sm text-balance break-keep text-gray-10 sm:flex-1">
					<slot name="subTitle" />
				</p>
			</div>
		</div>
		<img
			{src}
			alt=""
			width="600"
			height="190"
			class={cn(
				'object-cover md:h-[190px] md:w-[78%]',
				isLeft ? 'object-right' : 'object-left'
			)}
		/>
	</a>
</div>
