<script lang="ts">
	import { page } from '$app/stores'
	import { currentCharacters } from '$entities/characters'
	import {
		EditCharacterButton,
		NewCharacterButton
	} from '$features/update-character'
	import DeleteCharacterButton from '$features/update-character/ui/DeleteCharacterButton.svelte'
	import { checkMember } from '$shared/lib'
	import { ListTable } from '$shared/table'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($page.data.lang)
	})
</script>

<div>
	{#if $currentCharacters}
		<ListTable
			infoItems={$currentCharacters}
			let:infoItemData
			listClassName="gap-1"
		>
			<EditCharacterButton character={infoItemData} />
			<DeleteCharacterButton character={infoItemData} />
		</ListTable>
	{/if}
	<NewCharacterButton />
</div>
