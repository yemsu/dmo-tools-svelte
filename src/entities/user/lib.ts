export const TOKEN_NAME = 'DMO_AUTH_T'
export const G_TOKEN_NAME = 'G_AUTH_T'

export const setTokenCookie = (token: string, tokenName?: string) => {
	const tokenValue = token.replace('Bearer ', '')
	document.cookie = `${tokenName || TOKEN_NAME}=${tokenValue}; Secure;`
}

export const getTokenCookie = (tokenName?: string): string | null => {
	if (import.meta.env.SSR) return null
	const cookies = document.cookie.split('; ')
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=')
		if (name === (tokenName || G_TOKEN_NAME)) {
			return value
		}
	}
	return null
}

export const removeTokenCookie = (tokenName?: string) => {
	document.cookie = `${tokenName || TOKEN_NAME}=; Secure;`
}
