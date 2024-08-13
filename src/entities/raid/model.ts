import type { RaidData, ServerType } from '$entities/raid/types'
import { writable } from 'svelte/store'

export const crrServerType = writable<ServerType | undefined>()
export const raids = writable<RaidData[]>([])
export const selectedRaidTab = writable<RaidData>()

export const subscribeClientId = writable<string | undefined>()
