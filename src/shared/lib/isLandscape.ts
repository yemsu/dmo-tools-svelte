import { browser } from '$app/environment'
import { readable } from 'svelte/store'

type IsLandscape = boolean | undefined

const getInitialIsLandscape = (): IsLandscape => {
	if (!browser) return
	return window.matchMedia('(orientation: landscape)').matches
}

export const isLandscape = readable<IsLandscape>(
	getInitialIsLandscape(),
	(set) => {
		if (!browser) return

		const query = window.matchMedia('(orientation: landscape)')

		const updateIsLandscape = (e: MediaQueryListEvent | MediaQueryList) => {
			set(e.matches)
		}

		query.addEventListener('change', updateIsLandscape)

		return () => query.removeEventListener('change', updateIsLandscape)
	}
)
