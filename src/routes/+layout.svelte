<script>
	import 'iconify-icon'
	import '../app/app.css'
	import Header from './Header.svelte'
	import { cn } from '$shared/lib'
	import Gnb from './Gnb.svelte'
	import RaidAlarm from '$widgets/raid/ui/RaidAlarm.svelte'
	import { ToastPopup } from '$shared/toast'
	const META = {
		TITLE: '디지몬 마스터즈 도구 모음 - DMO tools',
		DESC: '디지몬 마스터즈 온라인 도구 모음 DMO tools 입니다. 보유 씰을 등록하여 목표 스탯까지의 효율적인 구매리스트를 확인하고, 유저들과 보스 레이드 정보도 공유하여 알람을 받아보세요!'
	}
</script>

<svelte:head>
	<title>{META.TITLE}</title>
	<meta name="description" content={META.DESC} />
	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={META.TITLE} />
	<meta property="og:description" content={META.DESC} />
	<meta property="og:image" content="/og-image.jpg" />
	<meta property="og:url" content="/og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={META.TITLE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="/og-image.jpg" />
	<meta name="twitter:title" content={META.TITLE} />
	<meta name="twitter:description" content={META.DESC} />
	<meta name="twitter:image" content="/og-image.jpg" />
</svelte:head>

<div
	class={cn(
		'relative flex min-h-[100svh] flex-col',
		'bg-secondary-5/70 md:mx-auto md:max-w-[800px]',
		'drop-shadow-white border border-white/10 border-y-transparent'
	)}
>
	<Header></Header>
	<RaidAlarm />

	<main class="relative flex-1">
		<slot></slot>
	</main>
	<Gnb />
	<ToastPopup />
</div>
