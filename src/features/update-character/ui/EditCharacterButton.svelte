<script lang="ts">
	import { page } from '$app/stores'
	import {
		currentCharacterId,
		currentCharacters,
		putCharacterName,
		type CharacterData
	} from '$entities/characters'
	import { TOAST } from '$shared/config'
	import { CHARACTER_SCHEMA, ValidationText } from '$shared/form'
	import ToggleFormWrap from '$shared/form/ui/ToggleFormWrap.svelte'
	import Icon from '$shared/icon/Icon.svelte'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'
	import { _ } from 'svelte-i18n'

	export let character: CharacterData
	let value = character.name
	let isValid: boolean
	$: lang = $page.data.lang as LangType

	const setIsValid = (_isValue: boolean) => {
		isValid = _isValue
	}

	const reset = () => {
		value = character.name
	}

	const changeTo = (characterId: number) => {
		currentCharacterId.set(characterId)
		toast.on(TOAST.CHARACTER_CHANGED[lang])
	}

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
</script>

<ToggleFormWrap
	bind:value
	placeholder={$_('add_character_name')}
	{isValid}
	{onsubmit}
	{reset}
>
	<button
		slot="defaultText"
		class="w-full text-left"
		title={$_('change_character')}
		on:click={() => changeTo(character.id)}
	>
		{character.name}
		{#if character.id === $currentCharacterId}
			<Icon
				icon="material-symbols:check"
				class="text-point"
				title={$_('current_character')}
			/>
		{/if}
	</button>
	<ValidationText
		slot="validationText"
		{value}
		{setIsValid}
		schema={CHARACTER_SCHEMA($currentCharacters || [])}
	/>
</ToggleFormWrap>
