import { browser } from '$app/environment'
import { readable } from 'svelte/store'

type IsLandscape = boolean | undefined

const getInitialIsLandscape = (): IsLandscape => {
	if (!browser) return undefined
	const orientationQuery = window.matchMedia('(orientation: landscape)')
	const widthQuery = window.matchMedia('(min-width: 1024px)')
	return orientationQuery.matches && widthQuery.matches
}

export const isLandscape = readable<IsLandscape>(
	getInitialIsLandscape(),
	(set) => {
		if (!browser) return

		const orientationQuery = window.matchMedia('(orientation: landscape)')
		const widthQuery = window.matchMedia('(min-width: 1024px)')

		const updateIsLandscape = () => {
			set(orientationQuery.matches && widthQuery.matches)
		}

		orientationQuery.addEventListener('change', updateIsLandscape)
		widthQuery.addEventListener('change', updateIsLandscape)

		return () => {
			orientationQuery.removeEventListener('change', updateIsLandscape)
			widthQuery.removeEventListener('change', updateIsLandscape)
		}
	}
)
