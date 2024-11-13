import { PATH } from '$shared/config'
import { _objKeys } from '$shared/lib'
import type { RequestHandler } from '@sveltejs/kit'

const onlyKrPaths = ['raid-timer', 'save-url']
const baseUrl = import.meta.env.VITE_BASE_URL

function generateUrlEntry(path: string): string {
	const restPath = path === '/' ? '' : path
	const isKrOnly = onlyKrPaths.some((onlyKrPath) =>
		restPath.includes(onlyKrPath)
	)

	if (isKrOnly) {
		return `
			<url>
				<loc>${baseUrl}/kr${restPath}</loc>
				<xhtml:link 
						rel="alternate" 
						hreflang="ko" 
						href="${baseUrl}/kr${restPath}"/>
			</url>
		`
	} else {
		return `
			<url>
				<loc>${baseUrl}/kr${restPath}</loc>
				<xhtml:link 
						rel="alternate" 
						hreflang="ko" 
						href="${baseUrl}/kr${restPath}"/>
				<xhtml:link 
						rel="alternate" 
						hreflang="en" 
						href="${baseUrl}/en${restPath}"/>
			</url>
			<url>
				<loc>${baseUrl}/en${restPath}</loc>
				<xhtml:link 
						rel="alternate" 
						hreflang="en" 
						href="${baseUrl}/en${restPath}"/>
				<xhtml:link 
						rel="alternate" 
						hreflang="ko" 
						href="${baseUrl}/kr${restPath}"/>
			</url>
		`
	}
}

export const GET: RequestHandler = async () => {
	const noSiteMapPages = [
		'MY_SEALS',
		'SETTING_SEALS',
		'CHARACTERS',
		'SAVE_URL',
		'JOIN',
		'MY_INFO',
		'PRIVACY_POLICY',
		'ERROR'
	]
	const paths = _objKeys(PATH)
		.filter((page) => !noSiteMapPages.includes(page))
		.map((page) => PATH[page])

	const sitemapXml = `
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset
			xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="http://www.w3.org/1999/xhtml"
		>
			${paths.map((path) => generateUrlEntry(path)).join('')}
		</urlset>
	`.trim()

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	})
}
