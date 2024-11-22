<script lang="ts">
	import { cn } from '$shared/lib'
	import { Title } from '$shared/text'

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
		class={cn('flex port:flex-col', isLeft ? '' : 'justify-end')}
		title={`${title} 바로가기`}
	>
		<div
			class={cn(
				'flex-center gap-2 port:py-4',
				'land:absolute land:top-0 land:h-full',
				isLeft
					? 'land:right-0 land:w-[26%] land:pl-6'
					: 'land:left-0 land:w-[28%] land:pl-2 land:pr-8 land:text-right',
				!isTop && 'land:justify-end'
			)}
		>
			<div class="flex gap-2 land:flex-col">
				<Title size="sm" weight="bold" class="text-primay-30">
					{title}
				</Title>
				<p
					class="text-balance break-keep text-body-sm text-gray-10 port:flex-1"
				>
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
				'object-cover land:h-[190px] land:w-[78%]',
				isLeft ? 'object-right' : 'object-left'
			)}
		/>
	</a>
</div>
