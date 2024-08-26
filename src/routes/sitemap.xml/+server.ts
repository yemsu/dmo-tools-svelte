import type { RequestHandler } from '@sveltejs/kit'
import * as sitemap from 'super-sitemap'

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: import.meta.env.VITE_BASE_URL
	})
}
