<script lang="ts">
	import { page } from '$app/stores'
	import {
		currentCharacters,
		putCharacterName,
		type CharacterData
	} from '$entities/characters'
	import { TOAST } from '$shared/config'
	import { CHARACTER_SCHEMA, ValidationText } from '$shared/form'
	import ToggleFormWrap from '$shared/form/ui/ToggleFormWrap.svelte'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'
	import { _ } from 'svelte-i18n'

	export let character: CharacterData
	let value = character.name
	let isValid: boolean
	$: lang = $page.data.lang as LangType

	$: onsubmit = async () => {
		const changedCharacterData = await putCharacterName(character.id, value)
		currentCharacters.update((prev) => {
			if (!prev) return
			const result = prev
			for (const character of result) {
				if (character.id === changedCharacterData.id) {
					character.name = changedCharacterData.name
				}
			}
			return result
		})
		toast.on(TOAST.CHARACTER_NAME_CHANGED[lang])
	}
	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}
	const resetValue = () => {
		value = character.name
	}
</script>

<ToggleFormWrap
	text={character.name}
	bind:value
	placeholder={$_('add_character_name')}
	{isValid}
	{onsubmit}
	{resetValue}
>
	<ValidationText
		slot="validationText"
		{value}
		{setIsValid}
		schema={CHARACTER_SCHEMA($currentCharacters || [])}
	/>
</ToggleFormWrap>
