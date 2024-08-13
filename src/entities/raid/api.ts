import { apiFetch } from '$shared/api'
import type { RaidData, RaidTimeData, ServerType } from './types'

export const getRaids = (serverType: ServerType) =>
	apiFetch<RaidData[]>(`/raids/${serverType}`)

type PostRaidTimeBody = {
	timeRemaining: number
	channel: RaidTimeData['channel']
	server: RaidTimeData['server']
}
export const postRaidTime = (raidId: RaidData['id'], body: PostRaidTimeBody) =>
	apiFetch<RaidData[]>(`/raids/${raidId}/timers`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	})

export const disSubscribe = (clientId: string) =>
	apiFetch<RaidData[]>(`/alarms/${clientId}/dis-subscribe`, {
		method: 'POST'
	})
