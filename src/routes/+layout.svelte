<script lang="ts">
	import { META } from '$shared/config'
	import { lang } from '$shared/model'
	import 'iconify-icon'
	import '../app/app.css'
	import '../lib/i18n'

	const adClient = import.meta.env.VITE_ADSENSE_CLIENT
</script>

<svelte:head>
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
		src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
		crossorigin="anonymous"
	></script>
</svelte:head>

<slot />
