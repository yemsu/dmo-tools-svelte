import { getSealPrices, getSeals } from '$entities/seals'
import { TOKEN_NAME, type UserData } from '$entities/user'
import { decodeJwtResponse } from '$shared/layout/lib/login'
import type { ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const load: ServerLoad = async (event) => {
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')
	let session: UserData | null = null
	const token = await event.cookies.get(TOKEN_NAME)
	if (token) {
		session = decodeJwtResponse(token)
	}

	return {
		seals,
		sealPrices,
		session
	}
}
