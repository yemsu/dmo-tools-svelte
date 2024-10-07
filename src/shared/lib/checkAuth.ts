import { goto } from '$app/navigation'
import { G_TOKEN_NAME, getTokenCookie, TOKEN_NAME } from '$entities/user'
import { PATH } from '$shared/config'
import type { Lang } from '$shared/types'

export const checkNoMember = (lang: Lang) => {
	const token = getTokenCookie(TOKEN_NAME)
	if (token) {
		goto(`/${lang}${PATH.SETTING_SEALS}`)
		return false
	}
	return true
}

export const checkJoinProcess = (lang: Lang) => {
	const gToken = getTokenCookie(G_TOKEN_NAME)
	if (!gToken) {
		goto(`/${lang}${PATH.LOGIN}`)
		return false
	}
	return true
}

export const checkMember = (lang: Lang) => {
	const token = getTokenCookie(TOKEN_NAME)
	if (!token) {
		goto(`/${lang}${PATH.LOGIN}`)
		return false
	}
	return true
}
