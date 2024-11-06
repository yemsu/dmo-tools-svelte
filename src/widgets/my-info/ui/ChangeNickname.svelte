<script lang="ts">
	import { page } from '$app/stores'
	import { putNickname, setTokenCookie, user } from '$entities/user'
	import { ALERT, CONFIRM, TOAST } from '$shared/config'
	import { NICKNAME_SCHEMA, ToggleFormWrap, ValidationText } from '$shared/form'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'

	let newNickname: string = ''
	let isValid: boolean
	$: lang = $page.data.lang as LangType

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}
	const reset = () => {
		newNickname = $user?.nickname || ''
		isValid = false
	}

	const onsubmit = async () => {
		if (!isValid) {
			alert(ALERT.INVALID_NICKNAME[lang])
			return
		}
		if (!newNickname) {
			alert(ALERT.BLANK_NICKNAME[lang])
			return
		}
		const isConfirm = confirm(CONFIRM.CHANGE_NICKNAME(newNickname)[lang])
		if (!isConfirm) return
		const res = await putNickname(newNickname)
		user.set(res)
		setTokenCookie(res.token)
		toast.on(TOAST.CHANGE_NICK(newNickname)[lang])
	}

	const setNewNickname = () => {
		if (!$user) return
		newNickname = $user.nickname
	}

	$: $user && setNewNickname()
</script>

<ToggleFormWrap
	defaultText={$user?.nickname || ''}
	bind:value={newNickname}
	placeholder={lang === 'kr' ? '변경할 닉네임' : 'New nickname to change to'}
	{isValid}
	{onsubmit}
	{reset}
>
	<ValidationText
		slot="validationText"
		value={newNickname}
		{setIsValid}
		schema={NICKNAME_SCHEMA}
	/>
</ToggleFormWrap>
