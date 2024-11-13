import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$entities: 'src/entities',
			$features: 'src/features',
			$widgets: 'src/widgets',
			$shared: 'src/shared'
		},
		prerender: {
			crawl: false,
			entries: [
				'/',
				'/kr',
				'/en',
				'/kr/calculator',
				'/en/calculator',
				'/kr/calculator/my-seals',
				'/en/calculator/my-seals',
				'/kr/calculator/setting-seals',
				'/en/calculator/setting-seals',
				'/kr/calculator/characters',
				'/en/calculator/characters',
				'/kr/gacha-simulator',
				'/en/gacha-simulator',
				'/kr/join',
				'/en/join',
				'/kr/login',
				'/en/login',
				'/kr/my/info',
				'/en/my/info',
				'/kr/policy/privacy',
				'/en/policy/privacy',
				'/kr/error',
				'/en/error',
				'/kr/raid-timer',
				'/kr/save-url',
				'/sitemap.xml'
			]
		}
	},
	plugins: [
		VitePWA({
			registerType: 'autoUpdate'
		})
	]
}

export default config
