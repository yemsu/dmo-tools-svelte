<script lang="ts">
	import { putNickname, setTokenCookie, user } from '$entities/user'
	import { ALERT, TOAST } from '$shared/config'
	import { ToggleFormWrap } from '$shared/form'
	import { toast } from '$shared/toast'
	import NickValidationText from '$widgets/my-info/ui/NickValidationText.svelte'

	let newNickname: string | null = null
	let isValid: boolean

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}
	const resetValue = () => {
		newNickname = null
	}

	const onsubmit = async () => {
		if (!isValid) {
			alert(ALERT.INVALID_NICKNAME)
			return
		}
		if (!newNickname) {
			alert(ALERT.BLANK_NICKNAME)
			return
		}
		const isConfirm = confirm(`"${newNickname}"으로 닉네임을 변경하시겠어요?`)
		if (!isConfirm) return
		const res = await putNickname(newNickname)
		user.set(res)
		setTokenCookie(res.token)
		toast.on(TOAST.CHANGE_NICK(newNickname))
		return res
	}
</script>

<ToggleFormWrap
	text={$user?.nickname || ''}
	bind:value={newNickname}
	placeholder="변경할 닉네임"
	{isValid}
	{onsubmit}
	{resetValue}
>
	<NickValidationText slot="validationText" value={newNickname} {setIsValid} />
</ToggleFormWrap>
