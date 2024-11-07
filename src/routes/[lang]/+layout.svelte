<script lang="ts">
	import { page } from '$app/stores'
	import { Footer, NoticeBar } from '$shared/layout'
	import { cn } from '$shared/lib'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { ToastPopup } from '$shared/toast'
	import { AdLayout } from '$widgets/adsense'
	import { Gnb, GnbMobile } from '$widgets/gnb'
	import RaidBar from '$widgets/raid-bar/ui/RaidBar.svelte'
	import Header from './Header.svelte'
	$: pathname = $page.url.pathname

	// 점검시
	// const gotoErrorPage = () => {
	// 	if (import.meta.env.SSR) return
	// 	if ($page.url.pathname !== '/error') {
	// 		goto(`/${lang}/error`)
	// 	}
	// }

	// $: pathname && gotoErrorPage()
</script>

<div class={cn('relative flex h-full flex-col')}>
	<NoticeBar />
	<Header />
	{#if $page.data.lang === 'kr'}
		<Inner class="w-full">
			<RaidBar />
		</Inner>
	{/if}

	<div class="scroll-box flex-1">
		<main class="relative h-full max-w-[100vw] overflow-hidden">
			<slot></slot>
		</main>
		<Footer />
	</div>
	<!-- <GnbMobile /> -->
	<AdLayout />
	<ToastPopup />
</div>
