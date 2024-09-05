<script lang="ts">
	import Arrow from '$shared/carousel/ui/Arrow.svelte'
	import { cn } from '$shared/lib'
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
	import emblaCarousel from 'embla-carousel-svelte'
	import { onDestroy, onMount } from 'svelte'

	type T = $$Generic<{ id: number }>
	export let dataList: T[] = []
	let emblaApi: EmblaCarouselType | null = null
	let options: EmblaOptionsType | null = {
		align: 'center'
	}
	let isCarouselActive: boolean | null = null
	let activeIndex: number = 0
	let resizeDebounceTimer: NodeJS.Timeout | null = null
	let isMobile: boolean | null = null

	const handleCarouselActive = () => {
		if (!emblaApi) return
		const snapLength = emblaApi.scrollSnapList().length
		console.log('snapLength', emblaApi.scrollSnapList())
		const isActive = snapLength > 1
		isCarouselActive = isActive
		if (!isActive) {
			emblaApi.reInit({ active: false })
		}
	}

	const initCarousel = () => {
		if (isCarouselActive !== null) isCarouselActive = null
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
		handleCarouselActive()
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

	$: dataList && initCarousel()
	$: isMobile !== null && initCarousel()
</script>

<div
	class="relative mx-auto w-full px-[50px] sm:w-[calc(360px-(var(--content-side)*2))]"
>
	<div
		class={cn(
			'mx-auto h-[310px] overflow-hidden',
			'p-[12px]',
			'transition-opacity md:w-[calc(170px+(152px*2)+(20px*2))] sm:w-[176px]'
		)}
		use:emblaCarousel={{ options, plugins: [] }}
		on:emblaInit={onInit}
	>
		<div
			class={cn(
				'flex gap-[20px]',
				isCarouselActive === false && 'justify-center'
			)}
		>
			{#each dataList as data, i (data.id)}
				<slot isActive={activeIndex === i} {data}></slot>
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
