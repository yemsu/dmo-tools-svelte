<script lang="ts">
	import { page } from '$app/stores'
	import { MENUS, type MenuType } from '$entities/menus'
	import { NewBadge } from '$shared/badge'
	import { EXTERNAL_LINK } from '$shared/config'
	import { _objKeys, cn } from '$shared/lib'
	import { Modal } from '$shared/modal'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { TextByLang } from '$shared/text'
	import ReportGuideModalContent from '$widgets/report-guide-modal/ui/ReportGuideModalContent.svelte'
	import { _ } from 'svelte-i18n'

	const getIsActive = (type: MenuType) =>
		$page.url.pathname.includes(MENUS[type].path)
</script>

<Inner size="full" class="flex-center md:gap-5">
	<nav class="flex-center flex-1">
		<h2 class="ir">글로벌 네비게이션</h2>
		<ul
			class={cn(
				'flex h-gnb-h w-full items-center justify-between gap-10 whitespace-nowrap p-1 md:p-1.5'
			)}
		>
			{#each _objKeys(MENUS) as menuType (menuType)}
				{#if !($lang === 'en' && menuType === 'raid')}
					{@const isActive = getIsActive(menuType)}
					<li class="h-full">
						<a
							href="/{$lang}{MENUS[menuType].path}"
							class={cn(
								'flex-center h-full hover:text-point',
								isActive && 'font-bold text-point'
							)}
						>
							<span class="relative">
								<TextByLang data={MENUS[menuType]} />
								{#if menuType === 'gacha'}
									<NewBadge startDate="Wed Nov 13 2024 17:37:25" />
								{/if}
							</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</Inner>

<div
	class="flex-center fixed bottom-8 right-8 z-floatingMenu h-14 w-14 rounded-full bg-primary-30 shadow-lg"
>
	{#if $lang === 'kr'}
		<a
			href="https://open.kakao.com/o/skcN4IDg"
			target="_blank"
			title="새창(오픈채팅)"
			class="flex-col-center gap-[2px] px-2 transition-opacity hover:opacity-100 md:gap-0.5 md:px-3"
		>
			<iconify-icon icon="tdesign:chat-bubble" width="24" height="24" />
			<span class="ir text-xs4 md:text-xs2">{$_('support')}</span>
		</a>
	{:else}
		<Modal>
			<button
				slot="buttonSlot"
				class="flex-col-center"
				let:toggleModal
				on:click={toggleModal}
			>
				<iconify-icon icon="tdesign:chat-bubble" width="20" height="20" />
				<span class="text-xs4 md:text-xs2">{$_('support')}</span>
			</button>
			<div slot="popupContent">
				<p>
					Are you having trouble using the site? <br />
					Please fill out the information below and email us at
					<a href="mailto:sssjsjj@gmail.com" class="text-point" title="Mail to">
						sssjsjj@gmail.com.
					</a> <br />
					We'll do our best to resolve the issue!
				</p>
				<div class="flex-center mt-4 rounded-sm border border-secondary-30 p-3">
					<ol class="text-sm1 flex flex-col gap-2">
						<li>1. DMO-tools username:</li>
						<li>2. User country:</li>
						<li>3. Browser used:</li>
						<li class="flex flex-col gap-2">
							4. Device type (PC/Mobile):
							<dl class="flex flex-col gap-2 pl-3">
								<dt>👉 if Device type is "Mobile"</dt>
								<div class="flex flex-col gap-2 pl-3">
									<dd>4-1. Device Model (if Mobile Device):</dd>
									<dd>4-2. OS (window/ios/android/etc):</dd>
									<dd>4-3. OS version:</dd>
								</div>
							</dl>
						</li>
						<li>5. Description of the Issue:</li>
					</ol>
				</div>
			</div>
		</Modal>
	{/if}
</div>
