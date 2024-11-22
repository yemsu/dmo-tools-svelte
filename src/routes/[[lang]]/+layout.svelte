<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_BASE_URL } from '$env/static/public'
	import NoticeBar from '$shared/layout/ui/NoticeBar.svelte'
	import { cn, isLandscape } from '$shared/lib'
	import { GlobalModal } from '$shared/modal'
	import { langPath } from '$shared/model'
	import { ToastPopup } from '$shared/toast'
	import { AdsenseRenderer } from '$widgets/adsense'
	import { SpaceBackground } from '$widgets/bg-space'
	import { Footer } from '$widgets/footer'
	import { SideMenu, TopMenu } from '$widgets/primary-menu'

	const pathWithoutLang = $page.data.url?.split($page.data.lang)[1] || ''
	const koreanUrl = `${PUBLIC_BASE_URL}/${pathWithoutLang}`
	const englishUrl = `${PUBLIC_BASE_URL}/en${pathWithoutLang}`
	$: isMain = $page.url.pathname === `${$langPath || '/'}`
	// 점검시
	// const gotoErrorPage = () => {
	// 	if (import.meta.env.SSR) return
	// 	if ($page.url.pathname !== '/error') {
	// 		goto(`${$langPath/error`)
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

<!-- <NoticeBar /> -->
<TopMenu class="land:hidden" />
<SideMenu class="port:hidden" />

<div
	class={cn(
		'relative port:pb-gnb-h land:ml-side-menu-w',
		'port:pt-[calc(var(--raid-bar-h)+var(--header-h))]'
	)}
>
	{#if isMain}
		<SpaceBackground />
	{/if}
	<main
		class={cn(
			'relative flex flex-1 flex-col',
			'port:min-h-content-h land:min-h-[100vh]'
		)}
	>
		<slot></slot>
	</main>
	{#if !$isLandscape}
		<Footer />
	{/if}
	<AdsenseRenderer />
</div>
<ToastPopup />
<GlobalModal />
