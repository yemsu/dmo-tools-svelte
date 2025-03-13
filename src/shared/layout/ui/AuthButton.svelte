<script lang="ts">
	import { goto } from '$app/navigation'
	import { user } from '$entities/user'
	import { GoogleLoginButton } from '$features/user/control-session'
	import { Button } from '$shared/button'
	import { PATH } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { cn, isLandscape } from '$shared/lib'
	import { langPath } from '$shared/model'
</script>

<div class={cn('relative flex justify-center', $$restProps.class)}>
	{#if $user}
		<Button
			on:click={() => {
				goto(`${$langPath}${PATH.MY_INFO}`)
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
		<GoogleLoginButton
			width={!$isLandscape ? '60px' : undefined}
			size={$isLandscape ? 'medium' : 'small'}
		/>
	{/if}
</div>
