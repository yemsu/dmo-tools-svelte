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
	import { PATH, TOAST } from '$shared/config'
	import {
		decodeJwtResponse,
		onGoogleScriptLoad
	} from '$shared/layout/lib/login'
	import { delay } from '$shared/lib'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { onMount } from 'svelte'

	export let id: string = 'googleLogin'
	export let size: 'small' | 'large' = 'small'
	export let text: 'signin' | 'signin_with' = 'signin'

	let isLoginButtonRendered: boolean | undefined = false

	const onGoogleLogin = async (token: string) => {
		const res = await postLogin(token)
		if (res === null) {
			setTokenCookie(token, G_TOKEN_NAME)
			goto(`/${$lang}${PATH.JOIN}`)
		} else {
			const { token, ...userData } = res
			setTokenCookie(res.token)
			user.set(userData)
			toast.on(TOAST.WELCOME(res.nickname)[$lang])
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
			const tokenParsed = decodeJwtResponse(session)
			user.set({
				email: tokenParsed.sub,
				nickname: tokenParsed.nickname
			})
		} else {
			renderButton()
		}
	}

	onMount(() => {
		checkLogin()
	})
</script>

<div {id}></div>
