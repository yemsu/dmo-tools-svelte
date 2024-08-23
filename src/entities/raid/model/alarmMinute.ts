import { toast } from '$shared/toast'
import { writable } from 'svelte/store'

const NAME = 'DMO_ALARM'
const defaultData = 5
const createAlarmMinute = () => {
	const { subscribe, set } = writable<number>(defaultData)
	return {
		subscribe,
		loadSavedData: () => {
			const savedData = localStorage.getItem(NAME)
			if (!savedData) {
				set(defaultData)
				return
			}

			set(+savedData)
		},
		set: (serverType: number) => {
			localStorage.setItem(NAME, `${serverType}`)
			set(serverType)
			subscribe((value) =>
				toast.on(`레이드 알림 타이머가 ${value}분 전으로 설정되었습니다.`)
			)
		}
	}
}
export const alarmMinute = createAlarmMinute()
