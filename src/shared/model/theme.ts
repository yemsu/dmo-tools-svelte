import { browser } from '$app/environment'
import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

export const THEME_STORAGE = 'DMO_THEME'

const createTheme = () => {
	const { subscribe, update } = writable<Theme>(getInitialTheme())

	return {
		subscribe,
		toggle: () => {
			update((currentTheme) => {
				const newTheme = currentTheme === 'light' ? 'dark' : 'light'
				if (browser) {
					localStorage.setItem(THEME_STORAGE, newTheme)
					document.documentElement.classList.toggle('dark')
				}
				return newTheme
			})
		}
	}
}

export const theme = createTheme()

function getInitialTheme(): Theme {
	if (!browser) return 'light'
	return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
