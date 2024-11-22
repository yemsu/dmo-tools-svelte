<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'
	import * as THREE from 'three'
	import { theme } from '$shared/model'

	interface ParticleSystem {
		positions: Float32Array
		colors: Float32Array
		connections: number[][]
		velocities: Float32Array
	}

	const config = {
		particleCount: 400,
		connectionDistance: 250,
		connectionProbability: 0.5,
		particleSpeed: 0.05,
		minParticleSize: 6,
		maxParticleSize: 9
	}

	$: backgroundColor = 0x0a0b14
	$: fogColor = 0x0a0b14
	$: particleColor = new THREE.Color('hsl(190, 80%, 88%)')

	let container: HTMLDivElement
	let scene: THREE.Scene
	let camera: THREE.PerspectiveCamera
	let renderer: THREE.WebGLRenderer
	let particles: THREE.Points
	let connections: THREE.LineSegments
	let particleSystem: ParticleSystem
	let animationFrameId: number

	function initParticleSystem(): ParticleSystem {
		const positions = new Float32Array(config.particleCount * 3)
		const colors = new Float32Array(config.particleCount * 3)
		const velocities = new Float32Array(config.particleCount * 3)
		const connections: number[][] = []

		for (let i = 0; i < config.particleCount; i++) {
			const i3 = i * 3
			positions[i3] = (Math.random() - 0.5) * 1000
			positions[i3 + 1] = (Math.random() - 0.5) * 1000
			positions[i3 + 2] = (Math.random() - 0.5) * 1000

			colors[i3] = particleColor.r
			colors[i3 + 1] = particleColor.g
			colors[i3 + 2] = particleColor.b

			velocities[i3] = (Math.random() - 0.5) * 0.4
			velocities[i3 + 1] = (Math.random() - 0.5) * 0.4
			velocities[i3 + 2] = (Math.random() - 0.5) * 0.4
		}

		for (let i = 0; i < config.particleCount; i++) {
			connections[i] = []
			if (Math.random() < 0.15) {
				for (let j = i + 1; j < config.particleCount; j++) {
					if (Math.random() < config.connectionProbability) {
						connections[i].push(j)
					}
				}
			}
		}

		return { positions, colors, connections, velocities }
	}

	function initThree() {
		scene = new THREE.Scene()
		scene.fog = new THREE.Fog(fogColor, 400, 1500)

		const aspectRatio = window.innerWidth / window.innerHeight
		camera = new THREE.PerspectiveCamera(60, aspectRatio, 1, 2000)
		camera.position.z = 1000

		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
		})
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		particleSystem = initParticleSystem()

		const geometry = new THREE.BufferGeometry()
		geometry.setAttribute(
			'position',
			new THREE.BufferAttribute(particleSystem.positions, 3)
		)
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(particleSystem.colors, 3)
		)

		// 원형 텍스처 생성
		const textureSize = 64
		const data = new Uint8Array(textureSize * textureSize * 4)
		const centerX = textureSize / 2
		const centerY = textureSize / 2

		for (let y = 0; y < textureSize; y++) {
			for (let x = 0; x < textureSize; x++) {
				const index = (y * textureSize + x) * 4
				const distanceFromCenter = Math.sqrt(
					Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
				)
				const radius = textureSize / 2
				const intensity = Math.max(0, 1 - distanceFromCenter / radius)
				// 가우시안 분포와 유사한 부드러운 감쇠를 위해 제곱
				const alpha = Math.pow(intensity, 2)

				data[index] = 255 // R
				data[index + 1] = 255 // G
				data[index + 2] = 255 // B
				data[index + 3] = Math.floor(alpha * 255) // A
			}
		}

		const texture = new THREE.DataTexture(
			data,
			textureSize,
			textureSize,
			THREE.RGBAFormat
		)
		texture.needsUpdate = true

		const material = new THREE.PointsMaterial({
			size: config.maxParticleSize,
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			transparent: true,
			map: texture,
			alphaTest: 0.001,
			depthWrite: false
		})

		particles = new THREE.Points(geometry, material)
		scene.add(particles)

		updateConnections()

		container.appendChild(renderer.domElement)
	}

	function animate() {
		const positions = particles.geometry.attributes.position
			.array as Float32Array

		for (let i = 0; i < config.particleCount; i++) {
			const i3 = i * 3

			positions[i3] += particleSystem.velocities[i3]
			positions[i3 + 1] += particleSystem.velocities[i3 + 1]
			positions[i3 + 2] += particleSystem.velocities[i3 + 2]

			const limit = 500
			if (Math.abs(positions[i3]) > limit) particleSystem.velocities[i3] *= -1
			if (Math.abs(positions[i3 + 1]) > limit)
				particleSystem.velocities[i3 + 1] *= -1
			if (Math.abs(positions[i3 + 2]) > limit)
				particleSystem.velocities[i3 + 2] *= -1
		}

		particles.geometry.attributes.position.needsUpdate = true

		updateConnections()
		renderer.render(scene, camera)
		animationFrameId = requestAnimationFrame(animate)
	}

	function updateConnections() {
		const positions = particles.geometry.attributes.position
			.array as Float32Array
		const linePositions: number[] = []
		const lineColors: number[] = []

		particleSystem.connections.forEach((connections, i) => {
			const i3 = i * 3
			connections.forEach((j) => {
				const j3 = j * 3
				const distance = Math.sqrt(
					Math.pow(positions[i3] - positions[j3], 2) +
						Math.pow(positions[i3 + 1] - positions[j3 + 1], 2) +
						Math.pow(positions[i3 + 2] - positions[j3 + 2], 2)
				)

				if (distance < config.connectionDistance) {
					linePositions.push(
						positions[i3],
						positions[i3 + 1],
						positions[i3 + 2],
						positions[j3],
						positions[j3 + 1],
						positions[j3 + 2]
					)

					const alpha = 1 - distance / config.connectionDistance
					const color = new THREE.Color('hsl(190, 80%, 88%)')

					lineColors.push(
						color.r,
						color.g,
						color.b,
						alpha * 0.2,
						color.r,
						color.g,
						color.b,
						alpha * 0.2
					)
				}
			})
		})

		if (connections) {
			scene.remove(connections)
		}

		const lineGeometry = new THREE.BufferGeometry()
		lineGeometry.setAttribute(
			'position',
			new THREE.Float32BufferAttribute(linePositions, 3)
		)
		lineGeometry.setAttribute(
			'color',
			new THREE.Float32BufferAttribute(lineColors, 4)
		)

		const lineMaterial = new THREE.LineBasicMaterial({
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			transparent: true
		})

		connections = new THREE.LineSegments(lineGeometry, lineMaterial)
		scene.add(connections)
	}

	function handleResize() {
		if (!browser) return

		const width = window.innerWidth
		const height = window.innerHeight

		camera.aspect = width / height
		camera.updateProjectionMatrix()

		renderer.setSize(width, height)
	}

	onMount(() => {
		if (!browser) return

		initThree()
		animate()

		window.addEventListener('resize', handleResize)
	})

	onDestroy(() => {
		if (!browser) return

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId)
		}
		window.removeEventListener('resize', handleResize)

		// Clean up Three.js resources
		if (renderer) {
			renderer.dispose()
		}
		if (particles) {
			particles.geometry.dispose()
			;(particles.material as THREE.Material).dispose()
		}
		if (connections) {
			connections.geometry.dispose()
			;(connections.material as THREE.Material).dispose()
		}
	})
</script>

<div class="fixed left-0 top-0 z-[-1] h-full w-full bg-background">
	<div bind:this={container} />
</div>
