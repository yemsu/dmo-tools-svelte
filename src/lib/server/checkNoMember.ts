import { G_TOKEN_NAME, TOKEN_NAME } from '$entities/user'
import { redirect, type ServerLoad } from '@sveltejs/kit'

export const checkNoMember: ServerLoad = async (event) => {
	const token = await event.cookies.get(TOKEN_NAME)
	if (token) {
		redirect(302, '/')
	}
}

export const checkJoinProcess: ServerLoad = async (event) => {
	const gToken = await event.cookies.get(G_TOKEN_NAME)
	if (!gToken) {
		redirect(302, '/')
	}
}

export const checkMember: ServerLoad = async (event) => {
	const token = await event.cookies.get(TOKEN_NAME)
	if (!token) {
		redirect(302, '/login')
	}
}
