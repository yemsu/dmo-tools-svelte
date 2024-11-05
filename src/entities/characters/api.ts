import { apiFetch } from '$shared/api'
import type { CharacterData } from './type'

export const getCharacters = () => apiFetch<CharacterData[]>('/characters')

export const postCharacter = (characterName: CharacterData['name']) => {
	return apiFetch<CharacterData>(`/characters?name=${characterName}`, {
		method: 'POST'
	})
}

export const putCharacter = (
	id: CharacterData['id'],
	newCharacterName: CharacterData['name']
) => {
	return apiFetch<CharacterData>(`/characters/${id}?name=${newCharacterName}`, {
		method: 'DELETE'
	})
}

export const deleteCharacter = (characterName: CharacterData['name']) => {
	return apiFetch<CharacterData>(`/characters/${characterName}`, {
		method: 'DELETE'
	})
}
