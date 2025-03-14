<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { RaidServerTabs } from '$features/raid/control-raid-timer'
	import { Dropdown } from '$shared/dropdown'
</script>

<Dropdown class="h-full {$$restProps.class}">
	<button
		slot="buttonSlot"
		let:toggleDropdown
		on:click={toggleDropdown}
		class="button-hover relative block h-full w-full text-center text-sub-lg land:px-2"
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
