import { locale, waitLocale } from 'svelte-i18n'

export const load = async ({ data, url }) => {
	let lang = url.pathname.split('/')[1] || 'kr'

	if (lang !== 'kr' && lang !== 'en') {
		lang = 'kr'
	}

	locale.set(lang)
	await waitLocale()

	return { ...data, lang }
}
