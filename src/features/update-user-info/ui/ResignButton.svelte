<script lang="ts">
	import { goto } from '$app/navigation'
	import {
		postResign,
		removeTokenCookie,
		TOKEN_NAME,
		user
	} from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { CONFIRM, PATH, TOAST } from '$shared/config'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	const onClickResign = async () => {
		const isConfirm = confirm(CONFIRM.RESIGN[$lang])
		if (!isConfirm) return
		const res = await postResign()
		if (res) {
			removeTokenCookie(TOKEN_NAME)
			user.set(null)
			toast.on(TOAST.RESIGN.SUCCESS[$lang])
			goto(`/${$lang}${PATH.SETTING_SEALS}`)
		} else {
			toast.on(TOAST.RESIGN.FAIL[$lang])
		}
	}
</script>

<Button size="sm" variant="danger" on:click={onClickResign}>
	{$_('user.withdrawal')}
</Button>
