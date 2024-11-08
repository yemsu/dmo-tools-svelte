import { PATH } from '$shared/config'
import { _objKeys } from '$shared/lib'
import type { RequestHandler } from '@sveltejs/kit'
import * as sitemap from 'super-sitemap'

const onlyKrPaths = ['raid-timer', 'save-url']

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: import.meta.env.VITE_BASE_URL,
		excludeRoutePatterns: _objKeys(PATH)
			.map((page) => {
				const restPath = PATH[page] === '/' ? '' : PATH[page]
				const result = [`/kr${restPath}`, `/en${restPath}`]
				if (onlyKrPaths.find((onlyKrPath) => restPath.includes(onlyKrPath))) {
					return result[0]
				}
				return result
			})
			.flat()
	})
}
