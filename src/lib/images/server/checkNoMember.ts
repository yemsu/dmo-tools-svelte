import { G_TOKEN_NAME, TOKEN_NAME } from '$entities/user'
import { redirect, type ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const checkNoMember: ServerLoad = async (event) => {
	const token = await event.cookies.get(TOKEN_NAME)
	const gToken = await event.cookies.get(G_TOKEN_NAME)
	if (token || !gToken) {
		redirect(302, '/')
	}
}
