<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$shared/button/ui/Button.svelte'
	import { TOAST } from '$shared/config'
	import { toast } from '$shared/toast'

	$: toLang = $page.data.lang === 'en' ? 'kr' : 'en'
	$: changeLang = () => {
		goto($page.url.pathname.replace(`/${$page.data.lang}`, `/${toLang}`))
		toast.on(TOAST.CHANGE_LANG(toLang))
	}
</script>

<Button
	class="flex-center border border-white/80 text-xs text-white/80 md:text-sm"
	title="유저 메뉴 열기"
	on:click={() => changeLang()}
>
	{toLang.toUpperCase()}
</Button>
