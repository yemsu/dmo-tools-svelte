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
		screens: {
			sm: '768px',
			md: '1024px',
			lg: '1280px'
		},
		extend: {
			colors: {
				primary: {
					5: 'hsl(var(--primary-5))',
					10: 'hsl(var(--primary-10))',
					20: 'hsl(var(--primary-20))',
					30: 'hsl(var(--primary-30))',
					40: 'hsl(var(--primary-40))',
					50: 'hsl(var(--primary-50))',
					90: 'hsl(var(--primary-90))'
				},
				stat: {
					at: 'hsl(var(--stat-at))',
					ht: 'hsl(var(--stat-ht))',
					ct: 'hsl(var(--stat-ct))',
					ds: 'hsl(var(--stat-cds))',
					ev: 'hsl(var(--stat-cev))',
					de: 'hsl(var(--stat-cde))'
				},
				point: 'hsl(var(--point))'
			},
			fontFamily: {
				tiny: ['Tiny5', 'sans-serif']
			},
			dropShadow: {
				'primary-90': '0 0 3px hsl(var(--primary-90))'
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
