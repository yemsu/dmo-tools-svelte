<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$shared/button/ui/Button.svelte'
	import { TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'

	$: toLang = ($lang === 'en' ? 'kr' : 'en') as LangType
	$: changeLang = () => {
		goto(
			toLang === 'kr'
				? $page.url.pathname.replace('/en', '') || '/'
				: `/en${$page.url.pathname}`
		)
		toast.on(TOAST.CHANGE_LANG[toLang])
	}
</script>

<Button
	class="relative"
	size="icon"
	variant="ghost"
	rounded="md"
	on:click={changeLang}
>
	<Icon icon="iconoir:language" size={18} />
	<span
		class="absolute right-0.5 top-0.5 rounded-full bg-background p-[1px] text-sub-sm"
	>
		{toLang.toUpperCase()}
	</span>
</Button>
