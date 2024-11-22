import { adsenseStore } from './model'
import { get } from 'svelte/store'

export const useAdsense = () => {
	const handleResize = () => {
		const state = get(adsenseStore)
		if (state.debounceTimer) {
			clearTimeout(state.debounceTimer)
		}

		const timer = setTimeout(() => {
			adsenseStore.resetAd(300)
			adsenseStore.setDebounceTimer(null)
		}, 300)

		adsenseStore.setDebounceTimer(timer)
	}

	const handlePageChange = () => {
		const state = get(adsenseStore)
		if (state.pageChangeTimer) {
			clearTimeout(state.pageChangeTimer)
		}

		const timer = setTimeout(() => {
			adsenseStore.resetAd(300)
			adsenseStore.setPageChangeTimer(null)
		}, 300)

		adsenseStore.setPageChangeTimer(timer)
	}

	return {
		handleResize,
		handlePageChange
	}
}
