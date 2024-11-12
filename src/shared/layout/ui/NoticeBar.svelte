<script lang="ts">
	import { PATH } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { onMount } from 'svelte'
	import { _ } from 'svelte-i18n'

	const STORAGE_NAME = 'DMO_NCC'
	let showNotice = false

	onMount(() => {
		const savedData = localStorage.getItem(STORAGE_NAME)
		if (!savedData) showNotice = true
	})

	const clickDontShow = () => {
		localStorage.setItem(STORAGE_NAME, 'true')
		showNotice = false
	}
</script>

{#if showNotice}
	<div class="bg-primary-50 py-2 text-primary-5 sm:text-xs">
		<div class="flex-center relative mx-auto px-content-side md:w-content-w">
			<p class="text-balance break-keep text-center font-bold">
				<TextByLang
					text="효율 계산기에 캐릭터 설정 기능이 추가되었습니다!"
					engText="We've added a character selection feature to the efficiency calculator!"
				/>
				<br class="md:hidden" />
				<a
					href="/{$lang}{PATH.CHARACTERS}"
					class="ml-2 inline-flex items-center rounded-full bg-primary-10 p-1 px-3 text-xs font-medium text-white md:p-2"
				>
					<TextByLang
						text="캐릭터 설정 페이지 바로가기"
						engText="Go to Character Settings Page"
					/>
					<Icon icon="weui:arrow-filled" />
				</a>
			</p>
			<button
				class="position-y-center absolute right-content-side p-2 md:-right-2"
				title={$_('dont_show_again')}
				on:click={clickDontShow}
			>
				<Icon icon="mdi:close" size={16} /></button
			>
		</div>
	</div>
{/if}
