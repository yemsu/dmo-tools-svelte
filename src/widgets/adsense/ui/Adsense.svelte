<script lang="ts">
	import { page } from '$app/stores'
	import { cn } from '$shared/lib'
	import { onMount } from 'svelte'

	export let adSlot: number
	export let visibleDevice: 'all' | 'pc' | 'mobile'
	let isAdVisible = false

	const adClient = import.meta.env.VITE_ADSENSE_CLIENT
	const { class: className, ...restProps } = $$restProps

	function getIsAdVisible() {
		if (import.meta.env.SSR) return false
		const BREAK_POINT = 1100
		switch (visibleDevice) {
			case 'pc':
				return window.innerWidth > BREAK_POINT
			case 'mobile':
				return window.innerWidth <= BREAK_POINT
			default:
				return true
		}
	}

	onMount(() => {
		isAdVisible = getIsAdVisible()
	})

	$: onRouteChange = () => {
		if (!getIsAdVisible()) return
		isAdVisible = false
		setTimeout(() => {
			isAdVisible = true
		}, 300)
	}

	$: $page.url && onRouteChange()
</script>

{#if isAdVisible}
	<ins
		class={cn('adsbygoogle size-full', className)}
		style="display:block"
		data-ad-client={adClient}
		data-ad-slot={adSlot}
		data-ad-format="auto"
		data-full-width-responsive="true"
		{...restProps}
	></ins>
{/if}
