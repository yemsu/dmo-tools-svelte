<script lang="ts">
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { removeTokenCookie, user } from '$entities/user'
	import { Button } from '$shared/button'
	import { ERROR, PATH, TOAST } from '$shared/config'
	import { GoogleLoginButton } from '$shared/layout'
	import { delay } from '$shared/lib'
	import { Tab } from '$shared/tabs'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { Dropdown } from '$shared/dropdown'

	$: lang = $page.data.lang as LangType
	let isShowTab = false

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on(TOAST.LOGOUT[lang])
			isShowTab = false
			await delay(100)
		} catch (e) {
			error(550, ERROR.LOGOUT_FAIL[lang])
		}
	}
</script>

<div class="relative flex min-w-[100px] justify-end">
	{#if $user}
		<Dropdown menuBoxAlign="center">
			<Button
				slot="buttonSlot"
				let:toggleDropdown
				class="flex-center border border-white/80 text-xs text-white/80 md:text-sm"
				title={lang === 'kr' ? '유저 메뉴 열기' : 'User Menu'}
				on:click={toggleDropdown}
			>
				<iconify-icon icon="mdi:user" width={14} height={14} />
				{$user.nickname}
			</Button>
			<Tabs slot="contentSlot" let:closeDropdown dir="ver">
				<Tab
					on:click={() => {
						goto(`/${$page.data.lang}${PATH.MY_INFO}`)
						closeDropdown()
					}}
				>
					<TextByLang text="마이 페이지" engText="My Page" />
				</Tab>
				<!-- <Tab
					on:click={() => {
						goto(`/${$page.data.lang}${PATH.SAVE_URL}`)
						isShowTab = false
					}}>url 데이터 저장</Tab
				> -->
				<Tab on:click={logout}>
					<TextByLang text="로그아웃" engText="Log out" />
				</Tab>
			</Tabs>
		</Dropdown>
	{:else}
		<GoogleLoginButton />
	{/if}
</div>
