import { preprocessMeltUI } from '@melt-ui/pp'
import { sequence } from '@melt-ui/pp'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

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
				'/en',
				'/calculator',
				'/en/calculator',
				'/calculator/my-seals',
				'/en/calculator/my-seals',
				'/calculator/setting-seals',
				'/en/calculator/setting-seals',
				'/calculator/characters',
				'/en/calculator/characters',
				'/gacha-simulator',
				'/en/gacha-simulator',
				'/join',
				'/en/join',
				'/login',
				'/en/login',
				'/my/info',
				'/en/my/info',
				'/policy/privacy',
				'/en/policy/privacy',
				'/error',
				'/en/error',
				'/raid-timer',
				'/save-url',
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
