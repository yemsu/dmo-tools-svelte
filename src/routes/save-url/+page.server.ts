import { checkMember } from '$lib/server/checkNoMember'
import { type ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async (event) => {
	return await checkMember(event)
}
