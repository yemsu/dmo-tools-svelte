// /src/routes/sitemap.xml/+server.ts
import { VITE_BASE_URL } from '$env/static/private'
import type { RequestHandler } from '@sveltejs/kit'
import * as sitemap from 'super-sitemap'

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: VITE_BASE_URL
	})
}
