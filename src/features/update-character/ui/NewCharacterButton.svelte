<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { currentCharacters, postCharacter } from '$entities/characters'
	import { Button } from '$shared/button'
	import { ALERT, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { Icon } from '$shared/icon'
	import { toast } from '$shared/toast'
	import { page } from '$app/stores'
	import type { LangType } from '$shared/types'
	import { cn } from '$shared/lib'

	let inputElement: HTMLInputElement
	let value = ''
	let isFormVisible = false
	$: lang = $page.data.lang as LangType

	const focusToInput = () => {
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const endForm = () => {
		isFormVisible = false
		value = ''
	}

	const toggleEditOn = () => {
		if (isFormVisible) {
			endForm()
		} else {
			isFormVisible = true
			focusToInput()
		}
	}

	$: onSubmit = async () => {
		if (!value) {
			alert(ALERT.NO_VALUE[lang])
			focusToInput()
			return
		}
		if ($currentCharacters?.find((character) => character.name === value)) {
			alert(ALERT.DUPLICATED_CHARACTER_NAME[lang])
			focusToInput()
			return
		}
		const newCharacterData = await postCharacter(value)
		currentCharacters.update((prev) => [...(prev || []), newCharacterData])

		toast.on(TOAST.CHARACTER_ADDED[lang])
		endForm()
	}
</script>

<Button
	on:click={toggleEditOn}
	size="lg"
	bg="ghost"
	class="w-full"
	title={isFormVisible ? $_('cancel') : $_('add')}
>
	<Icon
		icon="gridicons:plus"
		class={cn('transition-transform', isFormVisible && 'rotate-45')}
		size={18}
	/>
</Button>
{#if isFormVisible}
	<form on:submit={onSubmit} class="mt-2 flex w-full gap-2">
		<Input
			placeholder={$_('add_character_name')}
			bind:value
			bind:inputElement
			class="w-full"
		/>
		<Button rounded="md" size="lg" bg="submit-primary">{$_('add')}</Button>
	</form>
{/if}
