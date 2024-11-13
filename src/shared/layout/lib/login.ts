import type { UserToken } from '$entities/user'
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public'

export const onGoogleScriptLoad = (
	targetId: string,
	cb: (token: string) => void,
	options: Record<string, string> = {}
) => {
	try {
		const handleCredentialResponse = (response: { credential: string }) => {
			cb(response.credential)
		}
		google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: handleCredentialResponse
		})
		google.accounts.id.renderButton(
			document.getElementById(targetId),
			{
				theme: 'outline',
				size: 'small',
				text: 'signin',
				shape: 'pill',
				logo_alignment: 'left',
				...options
			} // customization attributes
		)
		google.accounts.id.prompt() // also display the One Tap dialog
		return true
	} catch {
		return false
	}
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

	return JSON.parse(jsonPayload) as UserToken
}
