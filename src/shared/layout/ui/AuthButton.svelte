<script lang="ts">
	import { goto } from '$app/navigation'
	import { removeTokenCookie, user } from '$entities/user'
	import { Button } from '$shared/button'
	import { PATH } from '$shared/config'
	import { GoogleLoginButton } from '$shared/layout'
	import { delay } from '$shared/lib'
	import { Tab } from '$shared/tabs'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'

	let isShowTab = false

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on('로그아웃이 완료되었습니다.')
			isShowTab = false
			await delay(100)
		} catch (e) {
			error(550, '로그아웃 실패')
		}
	}
</script>

<div class="relative flex min-w-[100px] justify-end">
	{#if $user}
		<Button
			class="flex-center border border-white/80 text-xs text-white/80 md:text-sm"
			title="유저 메뉴 열기"
			on:click={() => (isShowTab = !isShowTab)}
		>
			<iconify-icon icon="mdi:user" width={14} height={14} />
			{$user.nickname}
		</Button>
		{#if isShowTab}
			<Tabs
				dir="ver"
				class="absolute -bottom-2 right-0 z-tooltip translate-y-full drop-shadow-lg peer-focus:flex"
			>
				<Tab
					on:click={() => {
						goto(PATH.SAVE_URL)
						isShowTab = false
					}}>url 데이터 저장</Tab
				>
				<Tab on:click={logout}>로그아웃</Tab>
			</Tabs>
		{/if}
	{:else}
		<GoogleLoginButton />
	{/if}
</div>
