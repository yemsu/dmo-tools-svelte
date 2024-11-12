// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
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

	return resolve(event)
}
