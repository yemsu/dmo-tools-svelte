import { goto } from '$app/navigation'
import { toast } from '$shared/toast'
import { writable } from 'svelte/store'

const PARAM_NAME = 'alarm'
const defaultData = 5
const createAlarmMinute = () => {
	const { subscribe, set } = writable<number>(defaultData)
	return {
		subscribe,
		loadSavedData: () => {
			const params = new URLSearchParams(window.location.search)
			const savedData = params.get(PARAM_NAME)
			if (!savedData) {
				set(defaultData)
				return
			}

			set(+savedData)
		},
		set: (serverType: number) => {
			const params = new URLSearchParams(window.location.search)
			params.set(PARAM_NAME, `${serverType}`)
			set(serverType)
			goto(`?${params.toString()}`)
			subscribe((value) =>
				toast.on(
					`레이드 알림 타이머가 ${value}분전으로 설정되었습니다. url을 저장해주세요.`
				)
			)
		}
	}
}
export const alarmMinute = createAlarmMinute()
