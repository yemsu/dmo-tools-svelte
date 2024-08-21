import { checkNoMember } from '$lib/images/server/checkNoMember'
import { type ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const load: ServerLoad = async (event) => {
	return await checkNoMember(event)
}
