import { checkJoinProcess, checkNoMember } from '$lib/server/checkNoMember'
import { type ServerLoad } from '@sveltejs/kit'

export const ssr = true
export const load: ServerLoad = async (event) => {
	await checkNoMember(event)
	return await checkJoinProcess(event)
}
