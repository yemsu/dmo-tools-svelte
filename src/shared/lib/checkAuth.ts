import { goto } from '$app/navigation'
import { G_TOKEN_NAME, getTokenCookie, TOKEN_NAME } from '$entities/user'
import { PATH } from '$shared/config'

export const checkNoMember = () => {
	const token = getTokenCookie(TOKEN_NAME)
	if (token) {
		goto(PATH.SETTING_SEALS)
		return false
	}
	return true
}

export const checkJoinProcess = () => {
	const gToken = getTokenCookie(G_TOKEN_NAME)
	if (!gToken) {
		goto(PATH.LOGIN)
		return false
	}
	return true
}

export const checkMember = () => {
	const token = getTokenCookie(TOKEN_NAME)
	if (!token) {
		goto(PATH.LOGIN)
		return false
	}
	return true
}