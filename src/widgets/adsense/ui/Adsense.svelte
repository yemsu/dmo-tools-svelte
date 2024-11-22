<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_ADSENSE_CLIENT } from '$env/static/public'
	import { cn, delay } from '$shared/lib'
	import { AD_SLOTS, type AdType } from '$widgets/adsense/config'
	import { onDestroy, onMount } from 'svelte'

	export let adType: AdType
	export let randomFormat: boolean = true
	export let afterRenderAd: ((adElement: HTMLDivElement) => void) | undefined =
		undefined
	let adElement: HTMLDivElement

	const { class: className, ...restProps } = $$restProps

	let idAdVisibleRefreshFlag = true
	let debounceTimer: NodeJS.Timeout | null = null

	const isServer = import.meta.env.SSR

	const resetAd = () => {
		if (isServer) return
		window.adsbygoogle = window.adsbygoogle || []
	}

	const rerenderAd = async () => {
		resetAd()
		idAdVisibleRefreshFlag = false
		await delay(300)
		idAdVisibleRefreshFlag = true
		await delay(60)
		afterRenderAd && afterRenderAd(adElement)
	}

	const onResize = () => {
		if (debounceTimer) {
			clearTimeout(debounceTimer)
		}
		debounceTimer = setTimeout(() => {
			rerenderAd()
			debounceTimer = null
		}, 100)
	}

	onMount(() => {
		setTimeout(() => {
			window.adsbygoogle.push({})
		}, 100)
		window.addEventListener('resize', onResize)
		resetAd()
	})

	onDestroy(() => {
		if (isServer) return
		window.removeEventListener('resize', onResize)
	})

	$: $page.url && rerenderAd()
</script>

{#if idAdVisibleRefreshFlag}
	<div bind:this={adElement} class={cn($$restProps.class)}>
		<ins
			{...restProps}
			class={cn(
				'adsbygoogle size-full',
				import.meta.env.DEV && 'border border-gray-5 bg-blue-9/10'
			)}
			data-ad-client={PUBLIC_ADSENSE_CLIENT}
			data-ad-slot={AD_SLOTS[adType]}
			data-ad-format={randomFormat ? 'auto' : undefined}
			data-full-width-responsive={randomFormat ? 'true' : 'false'}
		></ins>
	</div>
{/if}
