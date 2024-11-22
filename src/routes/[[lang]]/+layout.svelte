<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import {
		PUBLIC_ADSENSE_CLIENT,
		PUBLIC_BASE_URL,
		PUBLIC_GOOGLE_CLIENT_ID
	} from '$env/static/public'
	import { META } from '$shared/config'
	import NoticeBar from '$shared/layout/ui/NoticeBar.svelte'
	import { cn, isLandscape } from '$shared/lib'
	import { GlobalModal } from '$shared/modal'
	import { lang, langPath, theme } from '$shared/model'
	import { ToastPopup } from '$shared/toast'
	import { AdMobileBanner } from '$widgets/adsense'
	import { SpaceBackground } from '$widgets/bg-space'
	import { Footer } from '$widgets/footer'
	import { SideMenu, TopMenu } from '$widgets/primary-menu'
	import 'iconify-icon'
	import { onMount } from 'svelte'
	import '../../app/app.css'
	import '../../app/variables.css'
	import '../../lib/i18n'

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

	const OLD_DOMAIN = 'dmo-tools.vercel.app'
	const NEW_DOMAIN = 'dmo.greuta.org'

	function checkAndRedirect() {
		if (import.meta.env.SSR) return
		if (window.location.hostname !== OLD_DOMAIN) return
		const newUrl = window.location.href.replace(OLD_DOMAIN, NEW_DOMAIN)

		const redirected = sessionStorage.getItem('redirected')
		if (!redirected) {
			sessionStorage.setItem('redirected', 'true')
			window.location.href = newUrl
		}
	}

	function checkLang() {
		if (!browser) return
		const isOldKrPath = window.location.pathname.split('/')[1] === 'kr'
		if (!isOldKrPath) return
		window.location.href = window.location.href.replace('/kr', '')
	}

	// 초기 마운트시 체크
	onMount(() => {
		checkAndRedirect()
	})

	$: if ($page) {
		checkAndRedirect()
	}
	$: if (browser) {
		document.documentElement.classList.toggle('dark', $theme === 'dark')
	}
	$: $page.url && checkLang()
</script>

<svelte:head>
	<meta name="google-signin-client_id" content={PUBLIC_GOOGLE_CLIENT_ID} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={META.COMMON.TITLE[$lang]} />
	<meta property="og:description" content={META.COMMON.DESC[$lang]} />
	<meta property="og:image" content="/og-image.jpg" />
	<meta property="og:url" content="/og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={META.COMMON.TITLE[$lang]} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="/og-image.jpg" />
	<meta name="twitter:title" content={META.COMMON.TITLE[$lang]} />
	<meta name="twitter:description" content={META.COMMON.DESC[$lang]} />
	<meta name="twitter:image" content="/og-image.jpg" />
	<script
		async
		src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLIC_ADSENSE_CLIENT}`}
		crossorigin="anonymous"
	></script>
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

<NoticeBar />
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
	<AdMobileBanner />
</div>
<ToastPopup />
<GlobalModal />
