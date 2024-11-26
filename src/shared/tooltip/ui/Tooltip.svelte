<script lang="ts">
	import { cn } from '$shared/lib'
	import { afterUpdate, onMount } from 'svelte'

	export let as = 'div'
	export let size: 'sm' | 'md' | 'custom' = 'md'
	export let useAdaptiveX: boolean = false
	export let id: string

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
		left: 'land:-left-1 -translate-x-full left-10',
		right: 'land:-right-1 translate-x-full right-10'
	}
	const sizeStyles = {
		sm: 'p-2 text-sub-md land:text-sub-lg',
		md: 'p-4 text-sub-md land:text-body-sm',
		custom: ''
	}
</script>

<!-- 
	1. trigger 요소 하단에 Tooltip 컴포넌트 삽입
	2. trigger 요소와 Tooltip을 묶는 부모 요소에 "relative" class명 추가
	2. trigger 요소에 "peer/tooltip" 클래스명 추가
	3. trigger 요소에 tooltip id값과 동일한 aria-describedby 속성 추가 
-->
<svelte:element
	this={as}
	{...$$restProps}
	bind:this={tooltip}
	role="tooltip"
	{id}
	class={cn(
		'hidden flex-col peer-hover/tooltip:flex peer-focus/tooltip:flex',
		'absolute z-tooltip',
		'break-keep rounded-md',
		'border border-gray-5 bg-background/90',
		'drop-shadow-lg',
		sizeStyles[size],
		useAdaptiveX && positionStyles[tooltipPosition],
		$$restProps.class
	)}
>
	<slot></slot>
</svelte:element>
