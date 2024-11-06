import { apiFetch } from '$shared/api'
import type { CharacterData } from './type'

export const getCharacters = () => apiFetch<CharacterData[]>('/characters')

export const postCharacter = (characterName: CharacterData['name']) => {
	return apiFetch<CharacterData>(`/characters?name=${characterName}`, {
		method: 'POST'
	})
}

export const putCharacterName = (
	id: CharacterData['id'],
	newCharacterName: CharacterData['name']
) => {
	return apiFetch<CharacterData>(`/characters/${id}?name=${newCharacterName}`, {
		method: 'PUT'
	})
}

export const deleteCharacter = (characterId: CharacterData['id']) => {
	return apiFetch<CharacterData>(`/characters/${characterId}`, {
		method: 'DELETE'
	})
}
