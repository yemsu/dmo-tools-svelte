import tailwindScrollBar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

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
				secondary: {
					5: 'hsl(var(--secondary-5))',
					10: 'hsl(var(--secondary-10))',
					20: 'hsl(var(--secondary-20))',
					30: 'hsl(var(--secondary-30))',
					40: 'hsl(var(--secondary-40))',
					50: 'hsl(var(--secondary-50))'
				},
				stat: {
					at: 'hsl(var(--stat-at))',
					ht: 'hsl(var(--stat-ht))',
					ct: 'hsl(var(--stat-ct))',
					ds: 'hsl(var(--stat-cds))',
					ev: 'hsl(var(--stat-cev))',
					de: 'hsl(var(--stat-cde))'
				},
				price: {
					't-1': 'var(--price-t-1)',
					't-2': 'var(--price-t-2)',
					'm-1': 'var(--price-m-1)',
					'm-2': 'var(--price-m-2)',
					'b-1': 'var(--price-b-1))',
					'b-2': 'var(--price-b-2))'
				},
				point: 'hsl(var(--point))'
			},
			spacing: {
				'header-h': 'var(--header-h)',
				'content-fill-h': 'calc(100vh - var(--header-h) - 15px)'
			},
			fontFamily: {
				tiny: ['Tiny5', 'sans-serif']
			},
			dropShadow: {
				'primary-90': '0 0 3px hsl(var(--primary-90))'
			}
		}
	},

	plugins: [tailwindScrollBar({ nocompatible: true })]
} as Config