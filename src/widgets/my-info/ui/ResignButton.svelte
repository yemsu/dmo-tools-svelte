<script lang="ts">
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import {
		postResign,
		removeTokenCookie,
		TOKEN_NAME,
		user
	} from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { CONFIRM, PATH, TOAST } from '$shared/config'
	import { toast } from '$shared/toast'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	$: lang = $page.data.lang as LangType

	const onClickResign = async () => {
		const isConfirm = confirm(CONFIRM.RESIGN[lang])
		if (!isConfirm) return
		const res = await postResign()
		if (res) {
			removeTokenCookie(TOKEN_NAME)
			user.set(null)
			toast.on(TOAST.RESIGN.SUCCESS[lang])
			goto(`/${$page.data.lang}${PATH.SETTING_SEALS}`)
		} else {
			toast.on(TOAST.RESIGN.FAIL[lang])
		}
	}
</script>

<Button
	size="md-lg"
	rounded="md"
	class="bg-warning py-2"
	on:click={onClickResign}
>
	<TextByLang text="탈퇴" engText="Withdrawal" />
</Button>
