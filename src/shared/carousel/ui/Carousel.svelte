<script lang="ts">
	import { type GachaData, type GachaDataType } from '$entities/gacha'
	import Arrow from '$shared/carousel/ui/Arrow.svelte'
	import { cn } from '$shared/lib'
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
	import emblaCarousel from 'embla-carousel-svelte'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'

	export let gachaList: GachaData[]
	export let currentGachaType: GachaDataType
	export let activeGacha: GachaData
	let emblaApi: EmblaCarouselType | null = null
	let options: EmblaOptionsType | null = {
		align: 'start'
	}
	let isCarouselActive: boolean | null = null
	let activeIndex: number = 0
	let resizeDebounceTimer: NodeJS.Timeout | null = null
	let isMobile: boolean | null = null

	const dispatch = createEventDispatcher()

	const handleCarouselActive = () => {
		if (!emblaApi) return
		const snapLength = emblaApi.scrollSnapList().length
		const isActive = snapLength > 1
		isCarouselActive = isActive
		if (!isActive) {
			emblaApi.reInit({ active: false })
		}
	}

	const onActiveGachaChange = () => {
		let activeGachaIndex
		gachaList.forEach(({ id }, i) => {
			if (id === activeGacha.id) {
				activeGachaIndex = i
			}
		})
		if (activeGachaIndex !== undefined) {
			emblaApi?.scrollTo(activeGachaIndex)
		}
	}

	const reset = () => {
		if (isCarouselActive !== null) isCarouselActive = null
		dispatch('reset')
		activeIndex = 0
		emblaApi?.scrollTo(0)
	}

	const initCarousel = () => {
		reset()
		setTimeout(() => {
			if (!emblaApi) return
			emblaApi.reInit({
				active: true,
				slidesToScroll: 1
			})
			handleCarouselActive()
		}, 60)
	}

	$: onInit = (event: CustomEvent) => {
		emblaApi = event.detail
		if (!emblaApi) return
		emblaApi.on('select', () => {
			if (!emblaApi) return
			activeIndex = emblaApi.selectedScrollSnap()
		})
	}

	$: onClickArrow = (e: CustomEvent<'prev' | 'next'>) => {
		if (!emblaApi) return
		const direction = e.detail
		if (direction === 'prev') {
			emblaApi.scrollPrev()
		} else {
			emblaApi.scrollNext()
		}
	}

	const setIsMobile = () => {
		isMobile = window.innerWidth < 768
	}

	const onResize = () => {
		if (resizeDebounceTimer) {
			clearTimeout(resizeDebounceTimer)
		}
		setTimeout(() => {
			setIsMobile()
			resizeDebounceTimer = null
		}, 100)
	}

	onMount(() => {
		setTimeout(() => {
			setIsMobile()
		}, 60)
		window.addEventListener('resize', onResize)
	})
	onDestroy(() => {
		if (import.meta.env.SSR) return
		window.removeEventListener('resize', onResize)
	})

	$: isMobile !== null && initCarousel()
	$: currentGachaType && initCarousel()
	$: activeGacha !== null && onActiveGachaChange()
</script>

<div
	class={cn(
		'relative mx-auto w-full sm:w-[clamp(0px,100%,calc(var(--current-card-w)*3))]',
		isCarouselActive === null && 'opacity-0'
	)}
>
	<div
		class={cn(
			'sm:flex-center h-[var(--card-carousel-h)] overflow-hidden md:pt-[12px]',
			'transition-opacity'
		)}
		use:emblaCarousel={{ options, plugins: [] }}
		on:emblaInit={onInit}
	>
		<div
			class={cn(
				'mx-auto flex w-[var(--card-w)] md:gap-[var(--card-gap)]',
				isCarouselActive === false && 'justify-center'
			)}
		>
			{#each gachaList as data, i (data.id)}
				<slot
					isSelected={activeIndex === i}
					isPrev={activeIndex - 1 === i}
					isNext={activeIndex + 1 === i}
					{data}
				></slot>
			{/each}
		</div>
	</div>
	{#if isCarouselActive}
		<Arrow dir="prev" on:toDir={onClickArrow} disabled={activeIndex === 0} />
		<Arrow
			dir="next"
			on:toDir={onClickArrow}
			disabled={activeIndex === gachaList.length - 1}
		/>
	{/if}
</div>
