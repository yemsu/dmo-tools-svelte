<script lang="ts">
	import { currentCharacters, postCharacter } from '$entities/characters'
	import { Button } from '$shared/button'
	import { CONFIRM, TOAST } from '$shared/config'
	import { CHARACTER_SCHEMA } from '$shared/form'
	import ToggleFormWrap from '$shared/form/ui/ToggleFormWrap.svelte'
	import ValidationText from '$shared/form/ui/ValidationText.svelte'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	let value = ''
	let isValid = false
	let isFormVisible = false

	$: onsubmit = async () => {
		const isConfirmed = confirm(CONFIRM.ADD_CHARACTER(value)[$lang])
		if (!isConfirmed) return
		const newCharacterData = await postCharacter(value)
		currentCharacters.update((prev) => [...(prev || []), newCharacterData])

		toast.on(TOAST.CHARACTER_ADDED[$lang])
	}

	const setIsValid = (_isValid: boolean) => {
		isValid = _isValid
	}

	const reset = () => {
		isValid = false
		value = ''
	}
</script>

<ToggleFormWrap
	bind:value
	placeholder={$_('add_character_name')}
	size="lg"
	{isValid}
	{onsubmit}
	{reset}
>
	<Button
		slot="button"
		let:clickEditOn
		on:click={clickEditOn}
		size="lg"
		variant="outline"
		class="w-full"
		rounded="md"
		title={$_('add')}
	>
		<Icon
			icon="gridicons:plus"
			class={cn('transition-transform', isFormVisible && 'rotate-45')}
			size={15}
		/>
		{$_('add_character')}
	</Button>
	<ValidationText
		slot="validationText"
		bind:value
		{setIsValid}
		schema={CHARACTER_SCHEMA($currentCharacters || [])}
	/>
</ToggleFormWrap>
