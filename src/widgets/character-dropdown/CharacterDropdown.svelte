<script lang="ts">
	import { page } from '$app/stores'
	import { currentCharacterId, currentCharacters } from '$entities/characters'
	import { PATH } from '$shared/config'
	import { Dropdown } from '$shared/dropdown'
	import { Icon } from '$shared/icon'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { _ } from 'svelte-i18n'

	$: currentCharacter = $currentCharacters?.find(
		({ id }) => id === $currentCharacterId
	)
</script>

<Dropdown class="h-full">
	<button
		slot="buttonSlot"
		class="button-hover h-full min-w-[100px] rounded-l-md bg-primary-50 px-1 font-semibold text-black"
		title={$_('change_character')}
		let:toggleDropdown
		on:click={toggleDropdown}
	>
		{currentCharacter?.name || ''}
	</button>
	<div slot="contentSlot" let:closeDropdown>
		{#if $currentCharacters}
			<Tabs dir="ver" class="w-[150px]">
				{#each $currentCharacters as character (character.id)}
					<Tab
						isActive={character.name === currentCharacter?.name}
						on:click={() => {
							currentCharacterId.set(character.id)
							closeDropdown()
						}}
					>
						{character.name}
					</Tab>
				{/each}
			</Tabs>
		{/if}
		<a
			href="/{$page.data.lang}{PATH.CHARACTERS}"
			class="flex items-center justify-end gap-0.5 border-t border-gray-600 p-1 text-xs leading-none"
			title="{$_('character')} {$_('setting')}"
		>
			<Icon icon="ant-design:setting-outlined" />
		</a>
	</div>
</Dropdown>
