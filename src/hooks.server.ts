import { PATH } from '$shared/config'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const { url, params } = event
	const isEn = params.lang === 'en'

	// 영문에서 운영되지 않는 페이지 접근시 메인으로 redirect
	if (isEn) {
		const unavailablePaths = [PATH.RAID_TIMER]
		const isUnavailablePath = unavailablePaths.find((unavailablePath) =>
			url.pathname.includes(unavailablePath)
		)
		if (isUnavailablePath) {
			return Response.redirect(new URL('/en', event.url))
		}
	}

	return resolve(event)
}
