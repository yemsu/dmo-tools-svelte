<script lang="ts">
	import {
		currentCharacterId,
		currentCharacters,
		deleteCharacter,
		type CharacterData
	} from '$entities/characters'
	import { Button } from '$shared/button'
	import { CONFIRM, TOAST } from '$shared/config'
	import Icon from '$shared/icon/Icon.svelte'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	export let character: CharacterData

	$: clickDelete = async () => {
		const isConfirmed = confirm(CONFIRM.DELETE_CHARACTER[$lang])
		if (!isConfirmed) return
		if (!$currentCharacters) {
			alert('no current Characters')
			return
		}
		const deletedCharacter = await deleteCharacter(character.id)
		currentCharacters.update((prev) =>
			prev?.filter((character) => character.id !== deletedCharacter.id)
		)
		if ($currentCharacterId === deletedCharacter.id) {
			$currentCharacterId = $currentCharacters[0].id
		}

		toast.on(TOAST.CHARACTER_DELETED[$lang])
	}
</script>

<Button
	title={$_('delete')}
	on:click={clickDelete}
	size="icon"
	rounded="md"
	class="-mr-2 mb-auto ml-auto"
	variant="outline"
>
	<Icon icon="ph:trash" />
</Button>
