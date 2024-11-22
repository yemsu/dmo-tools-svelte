import type { ServerLoad } from '@sveltejs/kit'
import { locale, waitLocale } from 'svelte-i18n'

export const load: ServerLoad = async ({ url }) => {
	const path = url.pathname
	let lang = path.startsWith('/en') ? 'en' : 'kr'

	if (lang !== 'kr' && lang !== 'en') {
		lang = 'kr'
	}

	locale.set(lang)
	await waitLocale()

	return {
		lang,
		url: url.href
	}
}
