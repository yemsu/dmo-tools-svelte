<script lang="ts">
	import { page } from '$app/stores'
	import { cn, delay } from '$shared/lib'
	import { langPath } from '$shared/model'
	import Adsense from '$widgets/adsense/ui/Adsense.svelte'
	import { onDestroy, onMount } from 'svelte'

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

	type LandscapeLayoutType = 'bottom' | 'side'
	$: landscapeLayoutType = (
		$page.url.pathname.includes('gacha') ? 'bottom' : 'side'
	) as LandscapeLayoutType

	const styles = {
		side: {
			left: 'w-side-ad-w right-0 top-0 h-[30vh]',
			right: 'w-side-ad-w right-0 bottom-0 h-[70vh]'
		},
		bottom: {
			left: cn(
				'h-bottom-ad-h bottom-0',
				'right-0 w-[calc((100vw-var(--side-menu-w))*0.6)] '
			),
			right: cn(
				'h-bottom-ad-h bottom-0',
				'left-side-menu-w w-[calc((100vw-var(--side-menu-w))*0.4)] '
			)
		}
	}
</script>

{#if idAdVisibleRefreshFlag}
	{#if $page.url.pathname !== `${$langPath || '/'}`}
		<Adsense
			adType="left"
			visibleDevice="pc"
			class={cn(
				'flex-center fixed overflow-hidden port:hidden',
				styles[landscapeLayoutType].left
			)}
			randomFormat={false}
		/>
		<Adsense
			adType="right"
			visibleDevice="pc"
			class={cn(
				'flex-center fixed overflow-hidden port:hidden',
				styles[landscapeLayoutType].right
			)}
			randomFormat={false}
		/>
	{/if}
{/if}
<div
	class={cn(
		'fixed bottom-0 h-mobile-bottom-ad-h w-full bg-background land:hidden'
	)}
>
	{#if idAdVisibleRefreshFlag}
		<Adsense
			adType="top"
			visibleDevice="mobile"
			style="display:inline-block;width:100%;height:60px"
			randomFormat={false}
		/>
	{/if}
</div>
