import type { ServerLoad } from '@sveltejs/kit'
import { locale, waitLocale } from 'svelte-i18n'

export const prerender = true

export const load: ServerLoad = async ({ url }) => {
	const path = url.pathname
	const lang = path.startsWith('/en') ? 'en' : 'kr'

	locale.set(lang)
	await waitLocale()

	return {
		lang,
		url: url.href
	}
}
