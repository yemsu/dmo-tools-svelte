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
	import { PATH, TOAST } from '$shared/config'
	import { toast } from '$shared/toast'

	$: lang = $page.data.lang as LangType

	const onClickResign = async () => {
		const isConfirm = confirm(
			'정말 탈퇴하시겠어요?\n탈퇴 후엔 모든 데이터가 삭제되며 복구가 불가합니다.'
		)
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
	on:click={onClickResign}>탈퇴</Button
>
