<script lang="ts">
	import { page } from '$app/stores'
	import {
		currentCharacters,
		putCharacterName,
		type CharacterData
	} from '$entities/characters'
	import { Button } from '$shared/button'
	import { ALERT, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { Icon } from '$shared/icon'
	import { toast } from '$shared/toast'
	import type { LangType } from '$shared/types'
	import { _ } from 'svelte-i18n'

	export let character: CharacterData
	let isFormVisible = false
	let value = character.name
	let inputElement: HTMLInputElement
	$: lang = $page.data.lang as LangType

	const endForm = () => {
		isFormVisible = false
		value = character.name
	}

	const focusToInput = () => {
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const clickOnEdit = () => {
		isFormVisible = true
		focusToInput()
	}

	$: onSubmit = async () => {
		if (!value) {
			alert(ALERT.NO_VALUE)
			focusToInput()
			return
		}
		if ($currentCharacters?.find((character) => character.name === value)) {
			alert(ALERT.DUPLICATED_CHARACTER_NAME[lang])
			focusToInput()
			return
		}
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
		endForm()
	}
</script>

{#if isFormVisible}
	<form on:submit={onSubmit} class="flex gap-1.5">
		<Input
			placeholder={$_('add_character_name')}
			bind:value
			bind:inputElement
			size="sm-md"
			class=""
		/>
		<Button rounded="md" size="sm" bg="submit-secondary">{$_('edit')}</Button>
		<Button type="button" rounded="md" size="sm" bg="ghost" on:click={endForm}
			>{$_('cancel')}</Button
		>
	</form>
{:else}
	<span class="w-[240px]">{character.name}</span>
	<Button size="icon" title={$_('edit')} on:click={clickOnEdit}>
		<Icon icon="lucide:edit" />
	</Button>
{/if}
