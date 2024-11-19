<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'
	import { theme } from '$shared/model'

	interface Star {
		x: number
		y: number
		z: number
		opacity: number
	}

	interface SpaceConfig {
		numStars: number
		speed: number
		trailEffect: boolean
		trailOpacity: number
	}

	$: starColor = isDarkTheme ? 'hsl(190, 80%, 88%)' : 'hsl(350, 80%, 10%)'

	const defaultConfig = {
		numStars: 2500,
		speed: 1.5,
		trailEffect: true,
		trailOpacity: 0.2
	}

	$: getResponsiveConfig = () => {
		if (!browser) return defaultConfig

		const baseWidth = 1920
		const currentWidth = window.innerWidth
		const starsRatio = Math.max(0.3, Math.min(1, currentWidth / baseWidth))
		const speedRatio = Math.max(0.3, Math.min(1, currentWidth / baseWidth))

		return {
			...defaultConfig,
			numStars: Math.floor(defaultConfig.numStars * starsRatio),
			speed: defaultConfig.speed * speedRatio
		}
	}
	$: isDarkTheme = $theme === 'dark'

	export let config: SpaceConfig = defaultConfig

	$: activeConfig = getResponsiveConfig()

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

	$: initializeStars = () => {
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

	$: drawStars = () => {
		if (!ctx) return
		const backgroundColor = isDarkTheme
			? `hsla(245, 8%, 10%,${activeConfig.trailEffect ? 1 - config.trailOpacity : 1})`
			: `hsla(190, 10%, 93%,${activeConfig.trailEffect ? 1 - config.trailOpacity : 1})`

		ctx.fillStyle = backgroundColor
		ctx.fillRect(0, 0, width, height)

		stars.forEach((star) => {
			if (!ctx) return
			const pixelX = (star.x - centerX) * (focalLength / star.z) + centerX
			const pixelY = (star.y - centerY) * (focalLength / star.z) + centerY
			const pixelRadius = 1 * (focalLength / star.z)

			const size = isDarkTheme
				? Math.min(Math.max(pixelRadius, 0.8), 2.5)
				: Math.min(Math.max(pixelRadius, 1), 3)

			ctx.fillStyle = `${starColor.replace('hsl', 'hsla').replace(')', `, ${star.opacity})`)}`
			ctx.fillRect(pixelX, pixelY, size, size)
		})
	}

	function animate(): void {
		if (!browser) return
		moveStars()
		drawStars()
		animationFrameId = requestAnimationFrame(animate)
	}

	function handleResize(): void {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		if (
			canvas.width !== window.innerWidth ||
			canvas.height !== window.innerHeight
		) {
			setCanvasSize()
			initializeStars()
			animate()
		}
	}

	const debouncedResize = debounce(handleResize, 150)

	onMount(() => {
		if (!browser) return

		ctx = canvas.getContext('2d')
		setCanvasSize()
		initializeStars()

		window.addEventListener('resize', debouncedResize)
	})

	onDestroy(() => {
		if (!browser) return

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		window.removeEventListener('resize', debouncedResize)
	})

	const toggleTheme = () => {
		if (!browser) return
		cancelAnimationFrame(animationFrameId)
		animate()
	}

	$: $theme && toggleTheme()
</script>

<canvas bind:this={canvas} class="fixed left-0 top-0 z-[-1] h-full w-full" />
