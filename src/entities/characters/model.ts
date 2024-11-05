import type { CharacterData } from './type'
import { writable } from 'svelte/store'

export const currentCharacters = writable<CharacterData[] | undefined>(
	undefined
)
export const currentCharacterId = writable<CharacterData['id'] | undefined>(
	undefined
)
