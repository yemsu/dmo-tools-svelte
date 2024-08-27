import type { UserResponse } from '$entities/user/type'
import { apiFetch } from '$shared/api'

export const getNickCheck = (nickname: string) =>
	apiFetch<boolean>(`/users/${nickname}/check`)

export const postLogin = (idToken: string) =>
	apiFetch<UserResponse>(`/users/login?idToken=${idToken}`, {
		method: 'POST'
	})

export const postSignup = (idToken: string, nickname: string) =>
	apiFetch<UserResponse>(`/users/signup`, {
		method: 'POST',
		body: JSON.stringify({
			idToken,
			nickname
		})
	})

export const postResign = () =>
	apiFetch<boolean>(`/users/resign`, {
		method: 'POST'
	})
