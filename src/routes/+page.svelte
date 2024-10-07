<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { getLocaleFromNavigator } from 'svelte-i18n'
	import { page } from '$app/stores'

	onMount(() => {
		if ($page.url.pathname === '/') {
			const userLocale = getLocaleFromNavigator() || 'en'
			const lang = userLocale.startsWith('ko') ? 'kr' : 'en'

			goto(`/${lang}`)
		}
	})
</script>
