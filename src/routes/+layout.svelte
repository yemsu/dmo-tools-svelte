<script lang="ts">
	import { META } from '$shared/config'
	import { lang } from '$shared/model'
	import 'iconify-icon'
	import '../app/app.css'
	import '../lib/i18n'
	import {
		PUBLIC_GOOGLE_CLIENT_ID,
		PUBLIC_ADSENSE_CLIENT
	} from '$env/static/public'
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
