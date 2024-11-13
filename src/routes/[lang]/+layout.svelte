<script lang="ts">
	import { page } from '$app/stores'
	import { Footer, NoticeBar } from '$shared/layout'
	import { cn } from '$shared/lib'
	import { GlobalModal } from '$shared/modal'
	import { lang } from '$shared/model'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { ToastPopup } from '$shared/toast'
	import { AdLayout } from '$widgets/adsense'
	import { Gnb } from '$widgets/gnb'
	import RaidBar from '$widgets/raid-bar/ui/RaidBar.svelte'
	import Header from './Header.svelte'
	$: pathname = $page.url.pathname
	import { PUBLIC_BASE_URL } from '$env/static/public'

	const pathWithoutLang = $page.data.url?.split($page.data.lang)[1] || ''
	const koreanUrl = `${PUBLIC_BASE_URL}/kr${pathWithoutLang}`
	const englishUrl = `${PUBLIC_BASE_URL}/en${pathWithoutLang}`

	// 점검시
	// const gotoErrorPage = () => {
	// 	if (import.meta.env.SSR) return
	// 	if ($page.url.pathname !== '/error') {
	// 		goto(`/${$lang}/error`)
	// 	}
	// }

	// $: pathname && gotoErrorPage()
</script>

<svelte:head>
	<!-- 다국어 -->
	<link rel="alternate" hreflang="ko" href={koreanUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="canonical" href={$page.data.url} />
	{#if $page.data.lang === 'kr'}
		<meta property="og:locale" content="ko_KR" />
		<meta name="language" content="Korean" />
	{:else}
		<meta property="og:locale" content="en_US" />
		<meta name="language" content="English" />
	{/if}
</svelte:head>

<div class={cn('relative flex h-full flex-col')}>
	<!-- <NoticeBar /> -->
	<div
		class={cn(
			'relative flex flex-1 flex-col overflow-hidden',
			'bg-secondary-5/70 md:mx-auto md:w-content-w',
			'drop-shadow-white border border-white/10 border-y-transparent'
		)}
	>
		<Header />
		{#if $lang === 'kr'}
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
		<Gnb />
		<AdLayout />
		<ToastPopup />
		<GlobalModal />
	</div>
</div>
