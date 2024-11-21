<script lang="ts">
	import { _ } from 'svelte-i18n'
	import Button from '$shared/button/ui/Button.svelte'
	import { lang } from '$shared/model'
	import { removeTokenCookie, user } from '$entities/user'
	import { ERROR, TOAST } from '$shared/config'
	import { delay } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { globalModalText } from '$shared/modal'

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on(TOAST.LOGOUT[$lang])
			await delay(100)
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
