<script lang="ts">
	import { page } from '$app/stores'
	import { PUBLIC_BASE_URL } from '$env/static/public'
	import { GlobalModal } from '$shared/modal'
	import { lang } from '$shared/model'
	import { ToastPopup } from '$shared/toast'
	import { Footer } from '$widgets/footer'
	import { Header } from '$widgets/header'
	import { AdLayout } from '$widgets/adsense'
	import RaidBar from '$widgets/raid-bar/ui/RaidBar.svelte'
	import { cn } from '$shared/lib'
	import { SpaceBackground } from '$widgets/bg-space'
	import { fade } from 'svelte/transition'

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
<Header noBg={isMain} />

<div class={cn(!isMain && 'relative mt-header-h')}>
	{#if isMain}
		<div
			transition:fade={{
				duration: 300
			}}
		>
			<SpaceBackground />
		</div>
	{/if}
	<main class="relative">
		<slot></slot>
	</main>
	<Footer />
</div>

{#if $lang === 'kr'}
	<RaidBar />
{/if}

{#if !isMain}
	<AdLayout />
{/if}
<ToastPopup />
<GlobalModal />
