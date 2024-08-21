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
	import { Tab } from '$shared/tabs'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'
	import { onMount } from 'svelte'

	let isShowTab = false

	const checkLogin = () => {
		if ($page.data.session) {
			user.set($page.data.session)
		}
	}

	const onGoogleLogin = async (token: string) => {
		const res = await postLogin(token)
		if (res === null) {
			setTokenCookie(G_TOKEN_NAME, token)
			goto('/join')
		} else {
			setTokenCookie(res.token)
			user.set(res)
			toast.on(`${res.nickname}님 환영합니다!`)
		}
	}

	const logout = () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on('로그아웃이 완료되었습니다.')
			isShowTab = false
			setTimeout(() => {
				onGoogleScriptLoad(onGoogleLogin)
			}, 100)
		} catch (e) {
			error(550, '로그아웃 실패')
		}
	}

	onMount(() => {
		checkLogin()
		!$page.data.session && onGoogleScriptLoad(onGoogleLogin)
	})
</script>

<div class="relative flex min-w-[100px] justify-end">
	{#if $user}
		<Button
			class="flex-center border border-white text-sm text-white"
			title="유저 메뉴 열기"
			on:click={() => (isShowTab = !isShowTab)}
		>
			<iconify-icon icon="mdi:user" width={14} height={14} />
			{$user.nickname}
		</Button>
		{#if isShowTab}
			<Tabs
				class="absolute -bottom-2 right-0 z-tooltip translate-y-full peer-focus:flex"
			>
				<Tab on:click={logout}>로그아웃</Tab>
			</Tabs>
		{/if}
	{:else}
		<div id="googleSignIn"></div>
	{/if}
</div>
