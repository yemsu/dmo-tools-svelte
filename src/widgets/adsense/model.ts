// stores/adsenseStore.ts
import { writable } from 'svelte/store'

interface AdsenseState {
	isAdVisible: boolean
	debounceTimer: NodeJS.Timeout | null
	pageChangeTimer: NodeJS.Timeout | null
}

const createAdsenseStore = () => {
	const { subscribe, update } = writable<AdsenseState>({
		isAdVisible: true,
		debounceTimer: null,
		pageChangeTimer: null
	})

	const resetAd = async (delay: number = 300) => {
		update((state) => ({ ...state, isAdVisible: false }))
		await new Promise((resolve) => setTimeout(resolve, delay))
		update((state) => ({ ...state, isAdVisible: true }))
	}

	const setDebounceTimer = (timer: NodeJS.Timeout | null) => {
		update((state) => ({ ...state, debounceTimer: timer }))
	}

	const setPageChangeTimer = (timer: NodeJS.Timeout | null) => {
		update((state) => ({ ...state, pageChangeTimer: timer }))
	}

	const clearTimers = () => {
		update((state) => {
			if (state.debounceTimer) clearTimeout(state.debounceTimer)
			if (state.pageChangeTimer) clearTimeout(state.pageChangeTimer)
			return {
				...state,
				debounceTimer: null,
				pageChangeTimer: null
			}
		})
	}

	return {
		subscribe,
		resetAd,
		setDebounceTimer,
		setPageChangeTimer,
		clearTimers
	}
}

export const adsenseStore = createAdsenseStore()
