<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { RaidServerTabs } from '$features/change-raid-server'
	import { Dropdown } from '$shared/dropdown'
</script>

<Dropdown class="h-full">
	<button
		slot="buttonSlot"
		let:toggleDropdown
		on:click={toggleDropdown}
		class="button-hover relative block h-full w-[40px] rounded-bl-md rounded-tl-md bg-primary-30 text-center text-xs md:w-[50px] md:px-2 md:text-sm"
		title={$_('raid.changeServer')}
	>
		{$crrServerType ? GAME_SERVERS[$crrServerType] : ''}
	</button>
	<RaidServerTabs
		slot="contentSlot"
		let:closeDropdown
		afterSelectServer={() => closeDropdown()}
		dir="ver"
	/>
</Dropdown>
