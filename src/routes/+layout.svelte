<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { getLocaleFromNavigator } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { PATH } from '$shared/config'

	onMount(() => {
		const path = $page.url.pathname
		if (path.includes('sitemap.xml')) return
		if (!path.startsWith('/kr') && !path.startsWith('/en')) {
			const userLocale = getLocaleFromNavigator() || 'en'
			const lang = userLocale.startsWith('ko') ? 'kr' : 'en'

			goto(`/${lang}`)
		}
	})
</script>

<slot />
