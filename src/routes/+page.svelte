<script lang="ts">
	import { Footer } from '$shared/layout'

	const langButtonStyle =
		'point-neon block w-[130px] rounded-lg p-6 hover:opacity-80'
</script>

<div class="flex-center mx-auto h-[100vh] flex-col gap-6 text-center">
	<div>
		<p class="text-gray-300">디지몬 마스터즈 도구 모음</p>
		<h1 class="text-logo font-tiny text-[60px] font-semibold leading-none">
			DMO tools
		</h1>
	</div>
	<main class="w-full bg-secondary-5/70 py-14">
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
	<Footer />
</div>
