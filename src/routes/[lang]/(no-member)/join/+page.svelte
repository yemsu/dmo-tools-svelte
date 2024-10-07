<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import {
		G_TOKEN_NAME,
		getTokenCookie,
		postSignup,
		removeTokenCookie,
		TOKEN_NAME,
		user
	} from '$entities/user'
	import { Button } from '$shared/button'
	import { ALERT, PATH, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { checkJoinProcess, checkNoMember } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { toast } from '$shared/toast'
	import NickValidationText from '$widgets/my-info/ui/NickValidationText.svelte'
	import { error } from '@sveltejs/kit'
	import { onMount } from 'svelte'

	let value: string | null = null
	let isValid: boolean
	let inputElement: HTMLInputElement

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}

	$: onSubmit = async () => {
		if (!isValid) {
			alert(ALERT.INVALID_NICKNAME)
			return
		}
		if (!value) {
			alert(ALERT.BLANK_NICKNAME)
			return
		}
		const googleToken = getTokenCookie(G_TOKEN_NAME)
		if (!googleToken) {
			error(
				550,
				'구글 로그인 정보가 만료되었습니다. 구글 로그인을 다시 진행해주세요.'
			)
		}
		const isConfirmed = confirm(
			`${value}: 이 닉네임으로 회원 가입을 진행하시겠어요?`
		)
		if (!isConfirmed) return
		const res = await postSignup(googleToken, value)
		user.set(res)
		removeTokenCookie(G_TOKEN_NAME)
		sessionStorage.setItem(TOKEN_NAME, res.token)
		toast.on(TOAST.JOIN(value))
		goto(`/${$page.data.lang}${PATH.SETTING_SEALS}`)
	}

	onMount(() => {
		const isNoMember = checkNoMember()
		if (!isNoMember) return
		checkJoinProcess()
		setTimeout(() => {
			inputElement.focus()
		}, 100)
	})
</script>

<Section size="sm" class="gap-10">
	<Title class="text-center">사이트에서 사용할 닉네임을 입력해 주세요.</Title>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex w-full items-start gap-2"
	>
		<div class="flex flex-1 flex-col gap-2">
			<Input placeholder="닉네임" bind:value bind:inputElement />
			<div class="h-[4em]">
				<NickValidationText {value} {setIsValid} />
			</div>
		</div>
		<Button size="lg" rounded="md" class="bg-primary-30" disabled={!isValid}>
			결정했어요
		</Button>
	</form>
</Section>
