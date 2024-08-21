import type { UserData } from '$entities/user/type'
import { apiFetch } from '$shared/api'

export const getNickCheck = (nickname: string) =>
	apiFetch<boolean>(`/users/${nickname}/check`)

export const postLogin = (idToken: string) =>
	apiFetch<UserData>(`/users/login?idToken=${idToken}`, {
		method: 'POST'
	})

export const postSignup = (idToken: string, nickname: string) =>
	apiFetch<UserData>(`/users/signup`, {
		method: 'POST',
		body: JSON.stringify({
			idToken,
			nickname
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	})

export const postResign = () =>
	apiFetch<boolean>(`/users/resign`, {
		method: 'POST'
	})
