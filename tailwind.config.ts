import tailwindScrollBar from 'tailwind-scrollbar'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		screens: {
			lg: '1200px',
			md: '769px',
			sm: { max: '768px' },
			port: { raw: '(max-width: 1023px), (orientation: portrait)' },
			land: { raw: '(min-width: 1024px) and (orientation: landscape)' },
			adPc: '1350px',
			adMobile: { max: '1349px' }
		},
		extend: {
			fontWeight: {
				light: 'var(--weight-light)',
				normal: 'var(--weight-normal)',
				semibold: 'var(--weight-semibold)',
				bold: 'var(--weight-bold)'
			},
			colors: {
				deep: 'hsl(var(--deep-color))',
				background: 'hsl(var(--background-color))',
				foreground: 'hsl(var(--gray-12))',
				skeleton: 'hsl(var(--gray-2))',
				blue: {
					1: 'hsl(var(--blue-1))',
					2: 'hsl(var(--blue-2))',
					3: 'hsl(var(--blue-3))',
					4: 'hsl(var(--blue-4))',
					5: 'hsl(var(--blue-5))',
					6: 'hsl(var(--blue-6))',
					7: 'hsl(var(--blue-7))',
					8: 'hsl(var(--blue-8))',
					9: 'hsl(var(--blue-9))',
					10: 'hsl(var(--blue-10))',
					11: 'hsl(var(--blue-11))',
					12: 'hsl(var(--blue-12))'
				},
				orange: {
					1: 'hsl(var(--orange-1))',
					2: 'hsl(var(--orange-2))',
					3: 'hsl(var(--orange-3))',
					4: 'hsl(var(--orange-4))',
					5: 'hsl(var(--orange-5))',
					6: 'hsl(var(--orange-6))',
					7: 'hsl(var(--orange-7))',
					8: 'hsl(var(--orange-8))',
					9: 'hsl(var(--orange-9))',
					10: 'hsl(var(--orange-10))',
					11: 'hsl(var(--orange-11))',
					12: 'hsl(var(--orange-12))'
				},
				gray: {
					1: 'hsl(var(--gray-1))',
					2: 'hsl(var(--gray-2))',
					3: 'hsl(var(--gray-3))',
					4: 'hsl(var(--gray-4))',
					5: 'hsl(var(--gray-5))',
					6: 'hsl(var(--gray-6))',
					7: 'hsl(var(--gray-7))',
					8: 'hsl(var(--gray-8))',
					9: 'hsl(var(--gray-9))',
					10: 'hsl(var(--gray-10))',
					11: 'hsl(var(--gray-11))',
					12: 'hsl(var(--gray-12))'
				},
				gacha: {
					10: '#080813',
					20: '#0e0e1d',
					30: '#0f0e22',
					40: '#081432',
					gold: '#DEAD00',
					'brown-30': '#2D2628',
					'brown-20': '#1B1613'
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
					'm-2': 'var(--price-m-2)'
				},
				point: 'hsl(var(--point))',
				warning: 'hsl(var(--warning))',
				red: 'hsl(var(--red))'
			},
			spacing: {
				'header-h': 'var(--header-h)',
				'gnb-h': 'var(--gnb-h)',
				'side-menu-w': 'var(--side-menu-w)',
				'content-w': 'var(--content-w)',
				'content-h': 'var(--content-h)',
				'content-side': 'var(--content-side)',
				'raid-bar-h': 'var(--raid-bar-h)',
				'input-h': 'var(--input-h)',
				'input-h-sm': 'var(--input-h-sm)',
				'input-h-xs': 'var(--input-h-xs)',
				'side-ad-w': 'var(--side-ad-w)',
				'bottom-ad-h': 'var(--bottom-ad-h)',
				'mobile-bottom-ad-h': 'var(--mobile-bottom-ad-h)'
			},
			fontSize: {
				'sub-sm': 'var(--font-sub-sm)',
				'sub-md': 'var(--font-sub-md)',
				'sub-lg': 'var(--font-sub-lg)',
				'body-sm': 'var(--font-body-sm)',
				'body-md': 'var(--font-body-md)',
				'body-lg': 'var(--font-body-lg)',
				'title-xs': 'var(--font-title-xs)',
				'title-sm': 'var(--font-title-sm)',
				'title-md': 'var(--font-title-md)',
				'title-lg': 'var(--font-title-lg)',
				'title-xl': 'var(--font-title-xl)'
			},
			fontFamily: {
				tiny: ['Tiny5', 'sans-serif', ...fontFamily.sans],
				pretendard: ['"Pretendard Variable", Pretendard', ...fontFamily.sans],
				ns: ['NanumSquare', ...fontFamily.sans],
				'ns-bold': ['NanumSquareBold', ...fontFamily.sans]
			},
			borderRadius: {
				sm: '0.2rem'
			},
			boxShadow: {
				lg: '0px 0px 15px var(--shadow-color-lg)'
			},
			zIndex: {
				'1': '1',
				header: '50',
				raidBar: '99',
				tooltip: '90',
				floatingMenu: '970',
				dim: '980',
				modal: '990',
				toast: '999',
				'progress-bar': '9999'
			}
		}
	},

	plugins: [
		tailwindScrollBar({ nocompatible: true }),
		function ({ addUtilities }) {
			addUtilities({
				'.env-3d': {
					perspective: '1000px'
				},
				'.prev-card': {
					transform: 'rotateY(-50deg) scale(95%);'
				},
				'.next-card': {
					transform: 'rotateY(50deg) scale(95%)'
				}
			})
		}
	]
} as Config
