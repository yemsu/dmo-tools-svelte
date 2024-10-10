<script lang="ts">
	import type { LangType } from '$shared/types'
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
	import { ALERT, CONFIRM, ERROR, PATH, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { checkJoinProcess, checkNoMember } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { toast } from '$shared/toast'
	import NickValidationText from '$widgets/my-info/ui/NickValidationText.svelte'
	import { error } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	let value: string | null = null
	let isValid: boolean
	let inputElement: HTMLInputElement
	$: lang = $page.data.lang as LangType

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}

	$: onSubmit = async () => {
		if (!isValid) {
			alert(ALERT.INVALID_NICKNAME[lang])
			return
		}
		if (!value) {
			alert(ALERT.BLANK_NICKNAME[lang])
			return
		}
		const googleToken = getTokenCookie(G_TOKEN_NAME)
		if (!googleToken) {
			error(550, ERROR.TOKEN_EXPIRED[lang])
		}
		const isConfirmed = confirm(`${value}: ${CONFIRM.FINAL_NICKNAME[lang]}`)
		if (!isConfirmed) return
		const res = await postSignup(googleToken, value)
		user.set(res)
		removeTokenCookie(G_TOKEN_NAME)
		sessionStorage.setItem(TOKEN_NAME, res.token)
		toast.on(TOAST.WELCOME(value)[lang])
		goto(`/${$page.data.lang}${PATH.SETTING_SEALS}`)
	}

	onMount(() => {
		const lang = $page.data.lang
		const isNoMember = checkNoMember(lang)
		if (!isNoMember) return
		checkJoinProcess(lang)
		setTimeout(() => {
			inputElement.focus()
		}, 100)
	})
</script>

<Section size="sm" class="gap-10">
	<Title class="text-center">
		<TextByLang
			text="사이트에서 사용할 닉네임을 입력해 주세요."
			engText="Please enter the nickname you will use on the site."
		/>
	</Title>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex w-full items-start gap-2"
	>
		<div class="flex flex-1 flex-col gap-2">
			<Input
				placeholder={lang === 'kr' ? '닉네임' : 'Nickname'}
				bind:value
				bind:inputElement
			/>
			<div class="h-[4em]">
				<NickValidationText {value} {setIsValid} />
			</div>
		</div>
		<Button size="lg" rounded="md" class="bg-primary-30" disabled={!isValid}>
			<TextByLang text="결정했어요" engText="Confirm" />
		</Button>
	</form>
</Section>
