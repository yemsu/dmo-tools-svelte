<script lang="ts">
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { putNickname, setTokenCookie, user } from '$entities/user'
	import { ALERT, CONFIRM, TOAST } from '$shared/config'
	import { ToggleFormWrap } from '$shared/form'
	import { toast } from '$shared/toast'
	import NickValidationText from '$widgets/my-info/ui/NickValidationText.svelte'

	let newNickname: string | null = null
	let isValid: boolean
	$: lang = $page.data.lang as LangType

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}
	const resetValue = () => {
		newNickname = null
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
		return res
	}
</script>

<ToggleFormWrap
	text={$user?.nickname || ''}
	bind:value={newNickname}
	placeholder={lang === 'kr' ? '변경할 닉네임' : 'New nickname to change to'}
	{isValid}
	{onsubmit}
	{resetValue}
>
	<NickValidationText slot="validationText" value={newNickname} {setIsValid} />
</ToggleFormWrap>
