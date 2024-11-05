import {
	getCharacters,
	postCharacter,
	putCharacterName,
	deleteCharacter
} from './api'
import { currentCharacterId, currentCharacters } from './model'
import type { CharacterData } from './type'

export {
	getCharacters,
	postCharacter,
	putCharacterName,
	deleteCharacter,
	currentCharacterId,
	currentCharacters,
	type CharacterData
}
