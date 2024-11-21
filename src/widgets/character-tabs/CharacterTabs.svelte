<script lang="ts">
	import { myStats } from '$entities/seals'
	import { currentCharacterId, currentCharacters } from '$entities/characters'
	import { user } from '$entities/user'
	import { Button } from '$shared/button'
	import { PATH, TOAST } from '$shared/config'
	import { Dropdown } from '$shared/dropdown'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { toast } from '$shared/toast'
	import { MyStatBox, StatBarTotalPrice, StatBarWrap } from '$widgets/stat-bar'
	import { _ } from 'svelte-i18n'

	$: currentCharacter = $currentCharacters?.find(
		({ id }) => id === $currentCharacterId
	)
</script>

{#if $user && $currentCharacters}
	<div class="w-full">
		<div class="flex items-center justify-between gap-1">
			<Tabs variant="separated" class="overflow-auto">
				{#each $currentCharacters as character (character.id)}
					<Tab
						variant="separated"
						isActive={character.name === currentCharacter?.name}
						on:click={() => {
							currentCharacterId.set(character.id)
							toast.on(TOAST.CHARACTER_CHANGED[$lang])
						}}
					>
						{character.name}
					</Tab>
				{/each}
			</Tabs>
			<Button
				size="icon-lg"
				variant="ghost"
				href="/{$lang}{PATH.CHARACTERS}"
				title="{$_('character')} {$_('setting')}"
				class="shrink-0"
			>
				<Icon icon="ant-design:setting-outlined" size="1.1em" />
			</Button>
		</div>
		<StatBarWrap class="flex-center mt-[-3px] rounded-tl-none">
			<dl>
				<MyStatBox stats={$myStats} />
			</dl>
		</StatBarWrap>
	</div>
{/if}
