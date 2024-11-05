<script lang="ts">
	import { page } from '$app/stores'
	import { currentCharacters } from '$entities/characters'
	import {
		EditCharacterButton,
		NewCharacterButton
	} from '$features/update-character'
	import Button from '$shared/button/ui/Button.svelte'
	import Icon from '$shared/icon/Icon.svelte'
	import { checkMember } from '$shared/lib'
	import { ListTable } from '$shared/table'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($page.data.lang)
	})
</script>

<div>
	{#if $currentCharacters}
		<ListTable infoItems={$currentCharacters} let:infoItemData>
			<EditCharacterButton character={infoItemData} />
			<Button size="icon" title="삭제">
				<Icon icon="ph:trash" />
			</Button>
		</ListTable>
	{/if}
	<NewCharacterButton />
</div>
