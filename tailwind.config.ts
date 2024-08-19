import tailwindScrollBar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			md: '768px'
		},
		extend: {
			colors: {
				primary: {
					5: 'hsl(var(--primary-5))',
					10: 'hsl(var(--primary-10))',
					20: 'hsl(var(--primary-20))',
					30: 'hsl(var(--primary-30))',
					35: 'hsl(var(--primary-35))',
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
					hp: 'hsl(var(--stat-hp))',
					ds: 'hsl(var(--stat-ds))',
					bl: 'hsl(var(--stat-bl))',
					ev: 'hsl(var(--stat-ev))',
					de: 'hsl(var(--stat-de))'
				},
				price: {
					't-1': 'var(--price-t-1)',
					't-2': 'var(--price-t-2)',
					'm-1': 'var(--price-m-1)',
					'm-2': 'var(--price-m-2)',
					'b-1': 'var(--price-b-1))',
					'b-2': 'var(--price-b-2))'
				},
				point: 'hsl(var(--point))',
				warning: 'hsl(var(--warning))'
			},
			spacing: {
				'header-h': 'var(--header-h)',
				'gnb-h': 'var(--gnb-h)',
				'content-fill-h':
					'calc(100svh - var(--header-h) - var(--gnb-h) - var(--raid-bar-h))',
				'content-side': 'var(--content-side)',
				'raid-bar-h': 'var(--raid-bar-h)',
				'input-h': 'var(--input-h)'
			},
			fontFamily: {
				tiny: ['Tiny5', 'sans-serif'],
				pretendard: ['"Pretendard Variable", Pretendard', ...fontFamily.sans]
			},
			dropShadow: {
				'primary-90': '0 0 3px hsl(var(--primary-90))',
				'primary-50': '0 0 5px hsl(var(--primary-50)/50%)',
				'primary-30': '0 0 40px hsl(var(--primary-30)/30%)',
				lg: '3px 3px 6px rgba(0,0,0,0.6)'
			},
			zIndex: {
				tooltip: '99',
				raidBar: '90',
				modal: '990',
				toast: '999'
			},
			fontSize: {
				xs4: '9px',
				xs3: '10px',
				xs2: '11px',
				xs: '12px',
				sm: '13px',
				md: '14px',
				lg: '16px',
				lg2: '18px'
			}
		}
	},

	plugins: [tailwindScrollBar({ nocompatible: true })]
} as Config
