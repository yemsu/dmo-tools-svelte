import type { UserData } from '$entities/user/type'
import { writable } from 'svelte/store'

export const gToken = writable<string | null>()
export const user = writable<UserData | null>()
