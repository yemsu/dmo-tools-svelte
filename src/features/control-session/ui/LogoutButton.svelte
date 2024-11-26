<script lang="ts">
	import { removeTokenCookie, user } from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { ERROR, TOAST } from '$shared/config'
	import { delay } from '$shared/lib'
	import { globalModalText } from '$shared/modal'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			history.back()
			await delay(100)
			toast.on(TOAST.LOGOUT[$lang])
		} catch (e) {
			console.error(ERROR.LOGOUT_FAIL[$lang], e)
			globalModalText.set({
				title: 'Error',
				description: ERROR.LOGOUT_FAIL
			})
		}
	}
</script>

<Button size="sm" variant="gray" on:click={logout}>
	{$_('user.logout')}
</Button>
