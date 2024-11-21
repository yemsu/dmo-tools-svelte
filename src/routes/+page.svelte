<script lang="ts">
	import { META } from '$shared/config'
	import { SpaceBackground } from '$widgets/bg-space'
	import { Footer } from '$widgets/footer'

	const langButtonStyle =
		'point-neon block w-[130px] rounded-lg p-6 hover:opacity-80'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE.en}</title>
	<meta name="description" content={META.COMMON.DESC.en} />
</svelte:head>

<div
	class="flex-center relative h-[100vh] flex-col gap-6 overflow-hidden text-center"
>
	<SpaceBackground />
	<div class="flex-center flex-1 flex-col pt-[10%]">
		<div>
			<p class="text-gray-11">디지몬 마스터즈 도구 모음</p>
			<h1 class="text-logo font-tiny text-[60px] font-semibold leading-none">
				DMO tools
			</h1>
		</div>
		<main class="w-full pt-10 land:pt-10">
			<div class="flex flex-col gap-1 text-lg2 font-light md:text-[20px]">
				<p>환영합니다! 언어를 선택해 주세요.</p>
				<p>Welcome! Please select a language.</p>
			</div>
			<ul class="flex-center mt-8 gap-6 text-xl">
				<li>
					<a href="/kr" class={langButtonStyle}>한국어</a>
				</li>
				<li>
					<a href="/en" class={langButtonStyle}>English</a>
				</li>
			</ul>
		</main>
	</div>
	<div class="mt-auto">
		<Footer />
	</div>
</div>
