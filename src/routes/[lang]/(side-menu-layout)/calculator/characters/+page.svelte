<script lang="ts">
	import { currentCharacters } from '$entities/characters'
	import {
		EditCharacterButton,
		NewCharacterButton
	} from '$features/update-character'
	import DeleteCharacterButton from '$features/update-character/ui/DeleteCharacterButton.svelte'
	import { checkMember } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { ListTable } from '$shared/table'
	import { Title } from '$shared/text'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($lang)
	})
</script>

<section class="flex-center flex-1">
	<Inner size="content-middle">
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
	</Inner>
</section>
