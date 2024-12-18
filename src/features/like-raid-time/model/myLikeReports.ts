import { writable } from 'svelte/store'

type MyLikeReport = {
	raidId: number
	channel: number
	timeId: number
}
const STORAGE_NAME = 'DMO_LIKE_REPORTS'
const createMyLikeReports = () => {
	const { subscribe, update, set } = writable<MyLikeReport[]>([])
	return {
		subscribe,
		loadMyLikeReports: () => {
			const savedData = localStorage.getItem(STORAGE_NAME)
			set(savedData ? JSON.parse(savedData) : [])
		},
		deleteMyLikeReport: (raidId: number) => {
			update((prev) =>
				prev.filter((likeReport) => likeReport.raidId !== raidId)
			)
			subscribe((myLikeReports) =>
				localStorage.setItem(STORAGE_NAME, JSON.stringify(myLikeReports))
			)
		},
		saveMyLikeReports: (raidId: number, channel: number, timeId: number) => {
			update((prev) => [...prev, { raidId, channel, timeId }])
			subscribe((myLikeReports) =>
				localStorage.setItem(STORAGE_NAME, JSON.stringify(myLikeReports))
			)
		}
	}
}

export const myLikeReports = createMyLikeReports()
