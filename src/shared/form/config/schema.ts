import type { CharacterData } from '$entities/characters'
import { getNickCheck } from '$entities/user'
import type { FormSchema } from '../types/schema'

const NO_SPECIAL_CHARACTER = {
	kr: '특수문자/공백은 사용할 수 없어요.',
	en: 'Special characters/spaces are not allowed.',
	check: (value: string) => !!value && !/^[가-힣a-zA-Z0-9]+$/.test(value)
}
const MIN = (min: number) => ({
	kr: '2자 이상 작성해 주세요.',
	en: `Please use at least ${min} characters.`,
	check: (value: string) => value.length < 2
})
const MAX = (max: number) => ({
	kr: '최대 10자까지 작성할 수 있어요.',
	en: `You can use up to a maximum of ${max} characters.`,
	check: (value: string) => value.length > 10
})
const DUPLICATED_NICKNAME = {
	kr: '이미 사용중인 닉네임이예요.',
	en: 'This nickname is already in use.',
	check: async (value: string) => {
		if (
			NO_SPECIAL_CHARACTER.check(value) ||
			MIN(2).check(value) ||
			MAX(10).check(value)
		) {
			return false
		}
		const isDuplicated = await getNickCheck(value)
		return isDuplicated
	}
}
export const NICKNAME_SCHEMA: Record<string, FormSchema> = {
	NO_SPECIAL_CHARACTER,
	MIN: MIN(2),
	MAX: MAX(10),
	DUPLICATED_NICKNAME
}

export const CHARACTER_SCHEMA = (
	currentCharacters: CharacterData[]
): Record<string, FormSchema> => ({
	NO_SPECIAL_CHARACTER,
	MIN: MIN(2),
	MAX: MAX(10),
	DUPLICATED_CHARACTER: {
		kr: '이미 사용중인 캐릭터명이예요.',
		en: 'This character name is already in use.',
		check: (value: string) => {
			return !!currentCharacters.find(({ name }) => name === value)
		}
	}
})
