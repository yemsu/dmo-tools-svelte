// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	// 구버전 도메인으로 접속시 현재 도메인으로 redirect
	if (!event.isDataRequest && !import.meta.env.DEV) {
		const host = event.request.headers.get('host')
		if (host?.includes('dmo-tools.vercel.app')) {
			return new Response(null, {
				status: 301,
				headers: {
					location: `${import.meta.env.VITE_BASE_URL}${event.url.pathname}${event.url.search}`
				}
			})
		}
	}

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
