<script lang="ts">
	import { cn } from '$shared/lib'
	import { afterUpdate, onMount } from 'svelte'

	export let size: 'sm' | 'md' | 'lg' = 'md'
	export let useAdaptiveX: boolean = false
	const { class: className, ...restProps } = $$restProps

	type Position_X = 'left' | 'right'
	let tooltip: HTMLDivElement
	let tooltipPosition: Position_X = 'right'
	const adjustTooltipPosition = () => {
		if (!tooltip) return

		const { left } = tooltip.parentElement!.getBoundingClientRect()
		const windowWidth = window.innerWidth

		// 화면 밖으로 나가는 경우 위치 조정
		if (left > windowWidth / 2) {
			tooltipPosition = 'left'
		}
	}
	onMount(() => {
		useAdaptiveX && adjustTooltipPosition()
	})
	afterUpdate(() => {
		useAdaptiveX && adjustTooltipPosition()
	})

	const positionStyles = {
		top: 'top-0',
		bottom: 'bottom-0',
		left: '-left-1 -translate-x-full',
		right: 'md:-right-1 translate-x-full right-10'
	}
	const sizeStyles = {
		sm: 'p-2',
		md: 'p-4',
		lg: ''
	}
</script>

<div
	bind:this={tooltip}
	class={cn(
		'hidden group-hover:block peer-hover:block',
		'absolute z-[99]',
		'break-keep rounded-md text-xs ',
		'border border-primary-30 bg-primary-5/50 backdrop-blur-sm',
		'drop-shadow-lg',
		sizeStyles[size],
		useAdaptiveX && positionStyles[tooltipPosition],
		className
	)}
	{...restProps}
>
	<slot></slot>
</div>
