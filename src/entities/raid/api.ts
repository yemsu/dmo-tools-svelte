import { apiFetch } from '$shared/api'
import type { RaidData, RaidTimeData, ServerType } from './types'

export const getRaids = (serverType: ServerType) =>
	apiFetch<RaidData[]>(`/raids/${serverType}`)

type PostRaidTimeBody = {
	timeRemaining: number
	channel: RaidTimeData['channel']
	server: RaidTimeData['server']
	clientId: number
}
export const postRaidTime = (raidId: RaidData['id'], body: PostRaidTimeBody) =>
	apiFetch<RaidData[]>(`/raids/${raidId}/timers`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	})

export const putRaidTimeVote = (clientId: number, timeId: RaidTimeData['id']) =>
	apiFetch<RaidTimeData>(`/raids/timers/${timeId}/vote?clientId=${clientId}`, {
		method: 'PUT'
	})

export const deleteRaidTime = (timerId: number) =>
	apiFetch<RaidTimeData>(`/raids/${timerId}`, {
		method: 'DELETE'
	})

export const getClientId = () => apiFetch<string>(`/alarms/client-id`)

export const disSubscribe = (clientId: number) =>
	apiFetch<boolean>(
		`/alarms/${clientId}/dis-subscribe`,
		{
			method: 'POST'
		},
		true
	)
