<script lang="ts">
	import { goto } from '$app/navigation'
	import { removeTokenCookie, user } from '$entities/user'
	import { GoogleLoginButton } from '$features/control-session'
	import { Button } from '$shared/button'
	import { ERROR, PATH, TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { cn, delay } from '$shared/lib'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'

	let isShowTab = false

	const logout = async () => {
		try {
			removeTokenCookie()
			user.set(null)
			toast.on(TOAST.LOGOUT[$lang])
			isShowTab = false
			await delay(100)
		} catch (e) {
			error(550, ERROR.LOGOUT_FAIL[$lang])
		}
	}
</script>

<div
	class={cn(
		'relative flex justify-center',
		'port:min-w-[100px]',
		$$restProps.class
	)}
>
	{#if $user}
		<Button
			on:click={() => {
				goto(`/${$lang}${PATH.MY_INFO}`)
			}}
			size="md"
			variant="ghost"
			class="w-full justify-between"
		>
			<Icon icon="mdi:user" size="1.1em" class="land:hidden" />
			{$user.nickname}
			<Icon icon="weui:arrow-filled" size={20} class="port:hidden" />
		</Button>
	{:else}
		<GoogleLoginButton />
	{/if}
</div>
