<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import {
		postLogin,
		setTokenCookie,
		removeTokenCookie,
		user,
		G_TOKEN_NAME
	} from '$entities/user'
	import { Button } from '$shared/button'
	import { onGoogleScriptLoad } from '$shared/layout/lib/login'
	import { delay } from '$shared/lib'
	import { Tab } from '$shared/tabs'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'
	import { onMount } from 'svelte'

	let isShowTab = false
	let isLoginButtonRendered = false

	const checkLogin = async () => {
		if ($page.data.session) {
			user.set($page.data.session)
		} else {
			isLoginButtonRendered = onGoogleScriptLoad(onGoogleLogin)
			if (!isLoginButtonRendered) {
				await delay(50)
				onGoogleScriptLoad(onGoogleLogin)
			}
		}
	}

	const onGoogleLogin = async (token: string) => {
		const res = await postLogin(token)
		if (res === null) {
			setTokenCookie(token, G_TOKEN_NAME)
			goto('/join')
		} else {
			setTokenCookie(res.token)
			user.set(res)
			toast.on(`환영합니다 ${res.nickname}님!`)
		}
	}

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on('로그아웃이 완료되었습니다.')
			isShowTab = false
			await delay(100)
			onGoogleScriptLoad(onGoogleLogin)
		} catch (e) {
			error(550, '로그아웃 실패')
		}
	}

	onMount(async () => {
		checkLogin()
	})
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
						goto('/save-url')
						isShowTab = false
					}}>url 데이터 저장</Tab
				>
				<Tab on:click={logout}>로그아웃</Tab>
			</Tabs>
		{/if}
	{:else}
		<div id="googleSignIn"></div>
	{/if}
</div>
