<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$shared/button/ui/Button.svelte'
	import { TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'

	$: toLang = ($page.data.lang === 'en' ? 'kr' : 'en') as LangType
	$: changeLang = () => {
		goto($page.url.pathname.replace(`/${$page.data.lang}`, `/${toLang}`))
		toast.on(TOAST.CHANGE_LANG[toLang])
	}
</script>

<Button
	class="flex-center border border-white/80  text-white/80"
	size="sm"
	on:click={changeLang}
>
	<Icon icon="material-symbols:language" />
	{toLang.toUpperCase()}
</Button>
