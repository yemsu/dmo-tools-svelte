<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { G_TOKEN_NAME, postLogin, setTokenCookie, user } from '$entities/user'
	import { onGoogleScriptLoad } from '$shared/layout/lib/login'
	import { delay } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { onMount } from 'svelte'
	let isLoginButtonRendered = false

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

	const renderButton = async () => {
		await delay(80)
		if ($user) return
		isLoginButtonRendered = onGoogleScriptLoad(onGoogleLogin)
		if (!isLoginButtonRendered) renderButton()
	}

	const checkLogin = () => {
		if ($page.data.session) {
			user.set($page.data.session)
		} else {
			renderButton()
		}
	}
	onMount(() => {
		onGoogleScriptLoad(onGoogleLogin)
		checkLogin()
	})
</script>

<div id="googleSignIn"></div>
