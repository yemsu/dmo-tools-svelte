import { PATH } from '$shared/config'
import { _objKeys } from '$shared/lib'
import type { RequestHandler } from '@sveltejs/kit'
import * as sitemap from 'super-sitemap'

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: import.meta.env.VITE_BASE_URL,
		excludeRoutePatterns: _objKeys(PATH)
			.map((page) => {
				const restPath = PATH[page] === '/' ? '' : PATH[page]
				return [`/kr${restPath}`, `/en${restPath}`]
			})
			.flat()
	})
}
