<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'

	interface Star {
		x: number
		y: number
		z: number
		opacity: number
	}

	interface SpaceConfig {
		numStars: number
		baseColor: string
		speed: number
		trailEffect: boolean
		trailOpacity: number
	}

	function getResponsiveConfig(): SpaceConfig {
		if (!browser) return defaultConfig

		const baseWidth = 1920
		const currentWidth = window.innerWidth
		const isMobile = currentWidth <= 768

		const starsRatio = isMobile
			? 0.1
			: Math.max(0.7, Math.min(1, currentWidth / baseWidth))

		const speedRatio = isMobile
			? 0.1
			: Math.max(0.7, Math.min(1, currentWidth / baseWidth))

		return {
			numStars: Math.floor(defaultConfig.numStars * starsRatio),
			baseColor: 'rgb(209, 255, 255)',
			speed: defaultConfig.speed * speedRatio,
			trailEffect: true,
			trailOpacity: 0.2
		}
	}

	const defaultConfig: SpaceConfig = {
		numStars: 2400,
		baseColor: 'rgb(209, 255, 255)',
		speed: 1.5,
		trailEffect: true,
		trailOpacity: 0.2
	}

	export let config: SpaceConfig = defaultConfig

	$: responsiveConfig = getResponsiveConfig()
	$: activeConfig = {
		...responsiveConfig,
		...config
	}

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D | null
	let animationFrameId: number
	let stars: Star[] = []

	let width = 0
	let height = 0
	let centerX = 0
	let centerY = 0
	let focalLength = 0

	function debounce<T extends (...args: any[]) => void>(
		fn: T,
		delay: number
	): (...args: Parameters<T>) => void {
		let timeoutId: ReturnType<typeof setTimeout>

		return function (...args: Parameters<T>) {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => fn(...args), delay)
		}
	}

	const randomOpacity = () => `0.${Math.floor(Math.random() * 99) + 1}`

	function initializeStars(): void {
		stars = Array.from({ length: activeConfig.numStars }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			z: Math.random() * width,
			opacity: Number(randomOpacity())
		}))
	}

	function setCanvasSize(): void {
		if (!canvas || !browser) return

		width = window.innerWidth
		height = window.innerHeight
		canvas.width = width
		canvas.height = height
		centerX = width / 2
		centerY = height / 2
		focalLength = width * 2
	}

	function moveStars(): void {
		stars.forEach((star) => {
			star.z -= activeConfig.speed

			if (star.z <= 0) {
				star.z = width
			}
		})
	}

	function drawStars(): void {
		if (!ctx) return

		if (activeConfig.trailEffect) {
			ctx.fillStyle = `rgba(0,10,20,${1 - config.trailOpacity})`
			ctx.fillRect(0, 0, width, height)
		} else {
			ctx.fillStyle = 'rgba(0,10,20,1)'
			ctx.fillRect(0, 0, width, height)
		}

		stars.forEach((star) => {
			if (!ctx) return
			const pixelX = (star.x - centerX) * (focalLength / star.z) + centerX
			const pixelY = (star.y - centerY) * (focalLength / star.z) + centerY
			const pixelRadius = 1 * (focalLength / star.z)

			const size = Math.min(Math.max(pixelRadius, 0.4), 2)

			ctx.fillStyle = `${activeConfig.baseColor.replace('rgb', 'rgba').replace(')', `, ${star.opacity})`)}`
			ctx.fillRect(pixelX, pixelY, size, size)
		})
	}

	function animate(): void {
		moveStars()
		drawStars()
		animationFrameId = requestAnimationFrame(animate)
	}

	function handleResize(): void {
		if (
			canvas.width !== window.innerWidth ||
			canvas.height !== window.innerHeight
		) {
			setCanvasSize()
			initializeStars()
		}
	}

	const debouncedResize = debounce(handleResize, 150)

	onMount(() => {
		if (!browser) return

		ctx = canvas.getContext('2d')
		setCanvasSize()
		initializeStars()
		animate()

		window.addEventListener('resize', debouncedResize)
	})

	onDestroy(() => {
		if (!browser) return

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		window.removeEventListener('resize', debouncedResize)
	})
</script>

<canvas bind:this={canvas} class="fixed left-0 top-0 z-[-1] h-full w-full" />
