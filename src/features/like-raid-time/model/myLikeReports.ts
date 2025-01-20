import type { RaidData } from '$entities/raid'
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
			const savedDataStr = localStorage.getItem(STORAGE_NAME)
			set(savedDataStr ? JSON.parse(savedDataStr) : [])
		},
		cleanOldRaidReports: (raids: RaidData[]) => {
			// 시작되지 않은 raid의 report만 필터링
			const crrRaidTimes = raids.map((raid) => raid.times).flat()
			const crrRaidReports: MyLikeReport[] = []
			subscribe((myLikeReports) =>
				myLikeReports.forEach((myLikeReport) => {
					const isCrrRaidTimeReport = crrRaidTimes.some(
						({ id }) => myLikeReport.timeId === id
					)
					if (isCrrRaidTimeReport) {
						crrRaidReports.push(myLikeReport)
					}
				})
			)

			set(crrRaidReports)
			localStorage.setItem(STORAGE_NAME, JSON.stringify(crrRaidReports))
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
