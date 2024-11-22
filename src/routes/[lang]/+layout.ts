import { locale, waitLocale } from 'svelte-i18n'

export const load = async ({ data, url }) => {
	const lang = url.pathname.split('/')[1] || 'kr'
	locale.set(lang)
	await waitLocale()
	return { ...data, lang }
}
