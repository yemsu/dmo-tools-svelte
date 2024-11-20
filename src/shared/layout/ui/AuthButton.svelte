<script lang="ts">
	import { goto } from '$app/navigation'
	import { removeTokenCookie, user } from '$entities/user'
	import { Button } from '$shared/button'
	import { ERROR, PATH, TOAST } from '$shared/config'
	import { Dropdown } from '$shared/dropdown'
	import { Icon } from '$shared/icon'
	import { GoogleLoginButton } from '$shared/layout'
	import { cn, delay } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Tab } from '$shared/tabs'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
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
			{$user.nickname}
			<Icon icon="weui:arrow-filled" size={20} />
		</Button>
	{:else}
		<GoogleLoginButton />
	{/if}
</div>
