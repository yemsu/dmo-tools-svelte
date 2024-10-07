<script lang="ts">
	import { cn } from '$shared/lib'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { ToastPopup } from '$shared/toast'
	import RaidBar from '$widgets/raid-bar/ui/RaidBar.svelte'
	import 'iconify-icon'
	import '../../app/app.css'
	import Gnb from './Gnb.svelte'
	import Header from './Header.svelte'
	import { META } from '$shared/config'
	import { NoticeBar } from '$shared/layout'
	import { AdLayout } from '$widgets/adsense'
	import '../../lib/i18n'
	const adClient = import.meta.env.VITE_ADSENSE_CLIENT
</script>

<svelte:head>
	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={META.COMMON.TITLE} />
	<meta property="og:description" content={META.COMMON.DESC} />
	<meta property="og:image" content="/og-image.jpg" />
	<meta property="og:url" content="/og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={META.COMMON.TITLE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="/og-image.jpg" />
	<meta name="twitter:title" content={META.COMMON.TITLE} />
	<meta name="twitter:description" content={META.COMMON.DESC} />
	<meta name="twitter:image" content="/og-image.jpg" />
	<script
		async
		src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
		crossorigin="anonymous"
	></script>
</svelte:head>

<div class={cn('relative flex h-full flex-col')}>
	<NoticeBar />
	<div
		class={cn(
			'relative flex flex-1 flex-col overflow-hidden',
			'bg-secondary-5/70 md:mx-auto md:w-content-w',
			'drop-shadow-white border border-white/10 border-y-transparent'
		)}
	>
		<Header />
		<Inner class="w-full">
			<RaidBar />
		</Inner>

		<main class="relative flex-1 overflow-hidden">
			<slot></slot>
		</main>
		<Gnb />
		<AdLayout />
		<ToastPopup />
	</div>
</div>
