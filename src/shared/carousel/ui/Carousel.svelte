<script lang="ts">
	import { page } from '$app/stores'
	import { gachaStore } from '$entities/gacha'
	import Arrow from '$shared/carousel/ui/Arrow.svelte'
	import { cn } from '$shared/lib'
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
	import emblaCarousel from 'embla-carousel-svelte'
	import { onDestroy, onMount } from 'svelte'

	type T = $$Generic<{ id: number }>
	export let dataList: T[] = []
	let emblaApi: EmblaCarouselType | null = null
	let options: EmblaOptionsType | null = {
		align: 'start'
	}
	let isCarouselActive: boolean | null = null
	let activeIndex: number = 0
	let resizeDebounceTimer: NodeJS.Timeout | null = null
	let isMobile: boolean | null = null

	const handleCarouselActive = () => {
		if (!emblaApi) return
		const snapLength = emblaApi.scrollSnapList().length
		const isActive = snapLength > 1
		isCarouselActive = isActive
		if (!isActive) {
			emblaApi.reInit({ active: false })
		}
	}

	const reset = () => {
		if (isCarouselActive !== null) isCarouselActive = null
		gachaStore.selectGacha($page.data.gachaSummons[0])
		activeIndex = 0
	}

	const initCarousel = () => {
		reset()
		setTimeout(() => {
			if (!emblaApi) return
			emblaApi.reInit({ active: true, slidesToScroll: isMobile ? 1 : 3 })
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
				'mx-auto flex md:w-[var(--card-carousel-w)] md:gap-[var(--card-gap)] sm:w-[var(--card-w)]',
				isCarouselActive === false && 'justify-center'
			)}
		>
			{#each dataList as data, i (data.id)}
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
			disabled={activeIndex === dataList.length - 1}
		/>
	{/if}
</div>
