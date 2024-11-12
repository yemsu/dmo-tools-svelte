<script lang="ts">
	import { currentCharacters } from '$entities/characters'
	import {
		EditCharacterButton,
		NewCharacterButton
	} from '$features/update-character'
	import DeleteCharacterButton from '$features/update-character/ui/DeleteCharacterButton.svelte'
	import { checkMember } from '$shared/lib'
	import { lang } from '$shared/model'
	import { ListTable } from '$shared/table'
	import Title from '$shared/text/ui/Title.svelte'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($lang)
	})
</script>

<div class="flex-center flex-1 overflow-hidden pt-1">
	<div class="flex max-h-full w-full max-w-[450px] flex-col">
		<Title class="mb-3">내 캐릭터 ({$currentCharacters?.length})</Title>
		{#if $currentCharacters}
			<div class="scroll-box flex-1">
				<ListTable
					infoItems={$currentCharacters}
					let:infoItemData
					listClassName="gap-1"
				>
					<EditCharacterButton character={infoItemData} />
					<DeleteCharacterButton character={infoItemData} />
				</ListTable>
			</div>
		{/if}
		<div class="mt-2">
			<NewCharacterButton />
		</div>
	</div>
</div>
