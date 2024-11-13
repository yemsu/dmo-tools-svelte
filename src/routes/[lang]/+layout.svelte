<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_BASE_URL } from '$env/static/public'
	import { Footer } from '$shared/layout'
	import { cn } from '$shared/lib'
	import { GlobalModal } from '$shared/modal'
	import { lang } from '$shared/model'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { ToastPopup } from '$shared/toast'
	import { AdLayout } from '$widgets/adsense'
	import RaidBar from '$widgets/raid-bar/ui/RaidBar.svelte'
	import Header from './Header.svelte'

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
	<Header />
	{#if $lang === 'kr'}
		<Inner class="w-full">
			<RaidBar />
		</Inner>
	{/if}

	<div class="mx-auto w-content-w flex-1">
		<main class="relative h-full max-w-[100vw] overflow-hidden">
			<slot></slot>
		</main>
		<Footer />
	</div>
	<AdLayout />
	<ToastPopup />
	<GlobalModal />
	<AdLayout />
	<ToastPopup />
	<GlobalModal />
	<AdLayout />
	<ToastPopup />
</div>
