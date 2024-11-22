<script lang="ts">
	import { page } from '$app/stores'
	import { cn, delay } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { useAdsense } from '$widgets/adsense/lib'
	import { adsenseStore } from '$widgets/adsense/model'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
	import { onDestroy, onMount } from 'svelte'

	let isAdInitialized = false
	const { class: className, ...restProps } = $$restProps

	const isServer = import.meta.env.SSR
	const { handleResize, handlePageChange } = useAdsense()

	const initAd = async () => {
		if (isServer || isAdInitialized) return

		try {
			window.adsbygoogle = window.adsbygoogle || []
			await delay(100)
			window.adsbygoogle.push({})
			isAdInitialized = true
		} catch (error) {
			console.error('Ad initialization error:', error)
		}
	}

	$: if ($page.url && !isServer) {
		handlePageChange()
	}

	onMount(() => {
		if (!isServer) {
			initAd()
			window.addEventListener('resize', handleResize)
		}
	})

	onDestroy(() => {
		if (isServer) return
		window.removeEventListener('resize', handleResize)
		adsenseStore.clearTimers()
	})
</script>

<div class="flex flex-1 flex-col land:pr-side-ad-w">
	<Inner class="flex flex-1 flex-col pb-content-side land:pt-header-h">
		<slot />
	</Inner>
</div>

<Adsense
	adType="left"
	visibleDevice="pc"
	class={cn(
		'fixed flex w-side-ad-w justify-center',
		'right-0 top-0 h-[30vh] overflow-hidden',
		'port:hidden'
	)}
/>
<Adsense
	adType="right"
	visibleDevice="pc"
	class={cn(
		'fixed flex w-side-ad-w justify-center',
		'bottom-0 right-0 h-[70vh] overflow-hidden',
		'port:hidden'
	)}
/>
