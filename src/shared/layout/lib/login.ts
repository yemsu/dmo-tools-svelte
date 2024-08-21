export const onGoogleScriptLoad = (cb: (token: string) => void) => {
	try {
		const handleCredentialResponse = (response: { credential: string }) => {
			cb(response.credential)
		}
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleCredentialResponse
		})
		google.accounts.id.renderButton(
			document.getElementById('googleSignIn'),
			{
				theme: 'outline',
				size: 'small',
				text: 'signin',
				shape: 'pill',
				logo_alignment: 'left'
			} // customization attributes
		)
		google.accounts.id.prompt() // also display the One Tap dialog
	} catch {}
}
export const decodeJwtResponse = (token: string) => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map((c) => {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)

	return JSON.parse(jsonPayload)
}
