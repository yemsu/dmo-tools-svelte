import type { RaidData } from '$entities/raid/types'
import { writable } from 'svelte/store'

export const selectedRaidId = writable<RaidData['id']>()

export const subscribeClientId = writable<number | undefined>()
