<script lang="ts">
	import { page } from '$app/stores'
	import { type MenuData } from '$entities/menus'
	import { cn } from '$shared/lib'
	import { Modal } from '$shared/modal'
	import { Inner } from '$shared/section'
	import type { LangType } from '$shared/types'
	import GnbMenu from './GnbMenu.svelte'
	import { _ } from 'svelte-i18n'

	$: lang = $page.data.lang as LangType
	const menuDataList: MenuData[] = [
		{
			type: 'calc',
			icon: {
				name: 'circum:calculator-2',
				width: 24,
				height: 24,
				class: 'mb-[1px]'
			}
		},
		{
			type: 'raid',
			icon: {
				name: 'ph:timer',
				width: 19,
				height: 19,
				class: '-ml-[1px] pt-[4px] pb-[1px]'
			}
		},
		{
			type: 'gacha',
			icon: {
				name: 'mingcute:random-line',
				width: 19,
				height: 19,
				class: '-ml-[1px] pt-[4px] pb-[1px]'
			}
		}
	]
</script>

<div class="h-gnb-h w-full">
	<Inner size="full" class="flex-center md:gap-5">
		<nav class="flex-center flex-1 rounded-t-[20px] bg-gray-800">
			<h2 class="ir">글로벌 네비게이션</h2>
			<ul
				class={cn(
					'flex h-gnb-h w-full items-center justify-between whitespace-nowrap p-1 md:p-1.5',
					'max-w-[600px]',
					'text-center text-xs4 md:text-sm'
				)}
			>
				{#each menuDataList as menuData (menuData.type)}
					{#if !(lang === 'en' && menuData.type === 'raid')}
						<GnbMenu {menuData} />
					{/if}
				{/each}
			</ul>
		</nav>
		<div class="flex-center h-full">
			{#if lang === 'kr'}
				<a
					href="https://open.kakao.com/o/skcN4IDg"
					target="_blank"
					title="새창(오픈채팅)"
					class="flex-col-center gap-[2px] px-2 opacity-50 transition-opacity hover:opacity-100 md:gap-0.5 md:px-3"
				>
					<iconify-icon
						icon="hugeicons:customer-support"
						width="20"
						height="20"
					/>
					<span class="text-xs4 md:text-xs2">{$_('support')}</span>
				</a>
			{:else}
				<Modal>
					<button
						slot="buttonSlot"
						class="flex-col-center"
						let:toggleModal
						on:click={toggleModal}
					>
						<iconify-icon
							icon="hugeicons:customer-support"
							width="20"
							height="20"
						/>
						<span class="text-xs4 md:text-xs2">{$_('support')}</span>
					</button>
					<div slot="popupContent">
						<p>
							Are you having trouble using the site? <br />
							Please fill out the information below and email us at
							<a
								href="mailto:sssjsjj@gmail.com"
								class="text-point"
								title="Mail to"
							>
								sssjsjj@gmail.com.
							</a> <br />
							We'll do our best to resolve the issue!
						</p>
						<div
							class="flex-center mt-4 rounded-sm border border-secondary-30 p-3"
						>
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
	</Inner>
</div>
