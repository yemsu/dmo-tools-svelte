import { skeleton } from '@skeletonlabs/tw-plugin'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import { join } from 'path'
import tailwindScrollBar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],

	theme: {
		extend: {
			colors: {
				primary: {
					50: 'hsl(var(--primary-50))',
					100: 'hsl(var(--primary-100))',
					200: 'hsl(var(--primary-200))',
					300: 'hsl(var(--primary-300))',
					400: 'hsl(var(--primary-400))'
				},
				stat: {
					at: 'hsl(var(--stat-at))',
					ht: 'hsl(var(--stat-ht))',
					ct: 'hsl(var(--stat-ct))',
					ds: 'hsl(var(--stat-cds))',
					ev: 'hsl(var(--stat-cev))',
					de: 'hsl(var(--stat-cde))'
				}
			}
		}
	},

	plugins: [
		typography,
		skeleton({
			themes: { preset: ['wintry'] }
		}),
		tailwindScrollBar({ nocompatible: true }),
		forms
	]
} as Config
