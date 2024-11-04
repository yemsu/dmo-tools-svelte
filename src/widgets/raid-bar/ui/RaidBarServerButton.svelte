<script lang="ts">
	import { crrServerType, GAME_SERVERS, type ServerType } from '$entities/raid'
	import { Dropdown } from '$shared/dropdown'
	import { _objKeys } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
</script>

<Dropdown class="h-full">
	<button
		slot="buttonSlot"
		let:toggleDropdown
		on:click={toggleDropdown}
		class="button-hover relative block h-full w-[40px] rounded-bl-md rounded-tl-md bg-primary-30 text-center text-xs md:w-[50px] md:px-2 md:text-sm"
		title="채널 변경"
	>
		{$crrServerType ? GAME_SERVERS[$crrServerType] : ''}
	</button>
	<Tabs slot="contentSlot" let:closeDropdown dir="ver" class="w-[100px]">
		{#each _objKeys(GAME_SERVERS) as serverType (serverType)}
			<Tab
				isActive={serverType === $crrServerType}
				on:click={() => {
					crrServerType.set(serverType)
					closeDropdown()
				}}
			>
				{GAME_SERVERS[serverType]}
			</Tab>
		{/each}
	</Tabs>
</Dropdown>
