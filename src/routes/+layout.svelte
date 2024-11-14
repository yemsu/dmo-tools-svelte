<script lang="ts">
	import { page } from '$app/stores'
	import {
		PUBLIC_ADSENSE_CLIENT,
		PUBLIC_GOOGLE_CLIENT_ID
	} from '$env/static/public'
	import { META } from '$shared/config'
	import { lang } from '$shared/model'
	import 'iconify-icon'
	import { onMount } from 'svelte'
	import '../app/app.css'
	import '../lib/i18n'

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
	// 초기 마운트시 체크
	onMount(() => {
		checkAndRedirect()
	})

	$: if ($page) {
		checkAndRedirect()
	}
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
</svelte:head>

<slot />
