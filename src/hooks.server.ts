// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// html lang 설정
	const lang = event.url.pathname.split('/')[1]
	const htmlLang = ['kr', 'en'].includes(lang)
		? lang === 'kr'
			? 'ko'
			: 'en'
		: 'kr'

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', htmlLang)
	})
}
