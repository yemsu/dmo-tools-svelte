<script lang="ts">
	import { currentCharacters } from '$entities/characters'
	import { NewCharacterButton } from '$features/update-character'
	import Button from '$shared/button/ui/Button.svelte'
	import Icon from '$shared/icon/Icon.svelte'
</script>

<div>
	{#if $currentCharacters}
		{#each $currentCharacters as character (character.id)}
			{character.name}
			<Button size="icon" title="삭제">
				<Icon icon="lucide:edit" />
			</Button>
			<Button size="icon" title="삭제">
				<Icon icon="ph:trash" />
			</Button>
		{/each}
		<NewCharacterButton />
	{/if}
</div>
