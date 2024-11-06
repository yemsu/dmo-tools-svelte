<script lang="ts">
	import { TextByLang } from '$shared/text'
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { META } from '$shared/config'
	$: lang = $page.data.lang as LangType
</script>

<svelte:head>
	<title>{META.ERROR.TITLE[lang]}</title>
	<meta name="description" content={META.ERROR.DESC[lang]} />
</svelte:head>

<div class="flex-center mx-auto h-full w-content-w">
	<div
		class="flex-center h-[500px] w-full flex-col gap-4 rounded-md pb-7 text-center text-lg"
	>
		<p>
			<span class="text-[80px]">🏸</span><br />
			<span class="text-[60px]">
				<TextByLang text="점검중" engText="Under Maintenance" />
			</span>
		</p>
		<p class="max-w-[500px] text-pretty text-gray-400">
			<TextByLang
				text="신규 기능 추가를 위한 서버 점검이 진행 중입니다. (약 5분 소요 예정)"
				engText="Server maintenance is currently underway to add new features. (Expected to take approximately 5 minutes)"
			/>
		</p>
	</div>
</div>
