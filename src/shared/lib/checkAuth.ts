import { goto } from '$app/navigation'
import { G_TOKEN_NAME, getTokenCookie, TOKEN_NAME } from '$entities/user'

export const checkNoMember = () => {
	const token = getTokenCookie(TOKEN_NAME)
	if (token) {
		goto('/')
	}
}

export const checkJoinProcess = () => {
	const gToken = getTokenCookie(G_TOKEN_NAME)
	if (!gToken) {
		goto('/')
	}
}

export const checkMember = () => {
	const token = getTokenCookie(TOKEN_NAME)
	if (!token) {
		goto('/login')
	}
}
