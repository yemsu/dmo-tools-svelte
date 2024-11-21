<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_BASE_URL } from '$env/static/public'
	import { cn, isLandscape } from '$shared/lib'
	import { GlobalModal } from '$shared/modal'
	import { lang } from '$shared/model'
	import { ToastPopup } from '$shared/toast'
	import { Footer } from '$widgets/footer'
	import { TopMenu } from '$widgets/primary-menu'
	import { SideMenu } from '$widgets/primary-menu'
	import { AdLayout } from '$widgets/adsense'
	import { SpaceBackground } from '$widgets/bg-space'

	const pathWithoutLang = $page.data.url?.split($page.data.lang)[1] || ''
	const koreanUrl = `${PUBLIC_BASE_URL}/kr${pathWithoutLang}`
	const englishUrl = `${PUBLIC_BASE_URL}/en${pathWithoutLang}`
	$: isMain = $page.url.pathname === `/${$lang}`
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

<!-- <NoticeBar /> -->
<TopMenu class="land:hidden" />
<SideMenu class="port:hidden" />

<div class={cn('relative land:ml-side-menu-w', !isMain && 'land:mr-side-ad-w')}>
	{#if isMain}
		<SpaceBackground />
	{/if}
	<main class="relative flex min-h-[100vh] flex-col">
		<slot></slot>
	</main>
	{#if !$isLandscape}
		<Footer />
	{/if}
</div>

{#if !isMain}
	<AdLayout />
{/if}
<ToastPopup />
<GlobalModal />
