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
				'/kr',
				'/kr/calculator',
				'/kr/calculator/my-seals',
				'/kr/calculator/setting-seals',
				'/kr/gacha-simulator',
				'/kr/join',
				'/kr/login',
				'/kr/my/info',
				'/kr/policy/privacy',
				'/kr/raid-timer',
				'/kr/save-url',
				'/en',
				'/en/calculator',
				'/en/calculator/my-seals',
				'/en/calculator/setting-seals',
				'/en/gacha-simulator',
				'/en/join',
				'/en/login',
				'/en/my/info',
				'/en/policy/privacy',
				'/en/raid-timer',
				'/en/save-url'
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
