export const TOKEN_NAME = 'DMO_AUTH_T'
export const setTokenCookie = (token: string) => {
	const tokenValue = token.replace('Bearer ', '')
	document.cookie = `${TOKEN_NAME}=${tokenValue}; Secure;`
}

export const removeTokenCookie = () => {
	document.cookie = `${TOKEN_NAME}=; Secure;`
}
