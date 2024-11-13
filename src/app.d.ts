// See https://kit.svelte.dev/docs/types#app
import type { LangType } from '$shared/types'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface PageData {
			lang: LangType
			url: string
		}

		// interface PageState {}
		// interface Platform {}
	}
}

declare module '$env/static/public' {
	export const PUBLIC_BASE_URL: string
	export const PUBLIC_API_BASE_URL: string
	export const PUBLIC_CONTENT_URL: string
	export const PUBLIC_ADSENSE_CLIENT: string
	export const PUBLIC_GOOGLE_CLIENT_ID: string
}
