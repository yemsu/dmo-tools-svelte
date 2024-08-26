<script lang="ts">
	import { goto } from '$app/navigation'
	import {
		G_TOKEN_NAME,
		getTokenCookie,
		postLogin,
		setTokenCookie,
		TOKEN_NAME,
		user
	} from '$entities/user'
	import { PATH } from '$shared/config'
	import {
		decodeJwtResponse,
		onGoogleScriptLoad
	} from '$shared/layout/lib/login'
	import { delay } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { onMount } from 'svelte'

	export let id: string = 'googleLogin'
	export let size: 'small' | 'large' = 'small'
	export let text: 'signin' | 'signin_with' = 'signin'

	let isLoginButtonRendered = false

	const onGoogleLogin = async (token: string) => {
		const res = await postLogin(token)
		if (res === null) {
			setTokenCookie(token, G_TOKEN_NAME)
			goto(PATH.JOIN)
		} else {
			setTokenCookie(res.token)
			user.set(res)
			toast.on(`환영합니다 ${res.nickname}님!`)
		}
	}

	const renderButton = async () => {
		await delay(80)
		if ($user) return
		isLoginButtonRendered = onGoogleScriptLoad(id, onGoogleLogin, {
			size,
			text
		})
		if (!isLoginButtonRendered) renderButton()
	}

	const checkLogin = () => {
		const session = getTokenCookie(TOKEN_NAME)
		if (session) {
			user.set(decodeJwtResponse(session))
		} else {
			renderButton()
		}
	}
	onMount(() => {
		checkLogin()
	})
</script>

<div {id}></div>
