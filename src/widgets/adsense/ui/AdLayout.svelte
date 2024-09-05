<script lang="ts">
	import { page } from '$app/stores'
	import { cn } from '$shared/lib'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
	import { onDestroy, onMount } from 'svelte'

	let idAdVisibleRefreshFlag = true
	let debounceTimer: NodeJS.Timeout | null = null

	const sideFixedCommonStyle =
		'fixed top-0 flex h-full w-[clamp(192px,calc((100vw-var(--content-w))/2),260px)] justify-center px-content-side py-header-h'
	const isServer = import.meta.env.SSR

	const resetAd = () => {
		if (isServer) return
		window.adsbygoogle = window.adsbygoogle || []
	}

	const rerenderAd = () => {
		resetAd()
		idAdVisibleRefreshFlag = false
		setTimeout(() => {
			idAdVisibleRefreshFlag = true
		}, 300)
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
		window.addEventListener('resize', onResize)
		resetAd()
	})

	onDestroy(() => {
		if (isServer) return
		window.removeEventListener('resize', onResize)
	})

	$: $page.url && rerenderAd()
</script>

<div class="h-[60px] adPc:hidden">
	{#if idAdVisibleRefreshFlag}
		<Adsense
			adType="top"
			visibleDevice="mobile"
			style="display:inline-block;width:100%;height:60px"
			randomFormat={false}
		/>
	{/if}
</div>
{#if idAdVisibleRefreshFlag}
	<div
		class={cn(
			sideFixedCommonStyle,
			'left-[calc(50%-(var(--content-w)/2))] -translate-x-full overflow-hidden',
			'adMobile:hidden'
		)}
	>
		<Adsense adType="left" visibleDevice="pc" />
	</div>
	<div
		class={cn(
			sideFixedCommonStyle,
			'right-[calc(50%-(var(--content-w)/2))] translate-x-full overflow-hidden',
			'adMobile:hidden'
		)}
	>
		<Adsense adType="right" visibleDevice="pc" />
	</div>
{/if}
