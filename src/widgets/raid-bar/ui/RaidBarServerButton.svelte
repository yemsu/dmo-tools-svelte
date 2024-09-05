<script lang="ts">
	import { crrServerType, GAME_SERVERS, type ServerType } from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
	import { onDestroy, onMount } from 'svelte'

	let isTabOpen = false
	let dropdownElement: HTMLDivElement
	const onClickTab = (serverType: ServerType) => {
		crrServerType.set(serverType)
		isTabOpen = false
	}

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropdownElement || !isTabOpen) return
		if (!dropdownElement.contains(e.target)) {
			isTabOpen = false
		}
	}

	onMount(() => {
		document.addEventListener('click', handleOutsideClick)
	})
	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div bind:this={dropdownElement} class="h-full">
	<button
		class="relative h-full w-[40px] rounded-bl-md rounded-tl-md bg-primary-30 text-center text-xs md:w-[50px] md:px-2 md:text-sm"
		title="채널 변경하기"
		on:click={() => (isTabOpen = true)}
	>
		{$crrServerType ? GAME_SERVERS[$crrServerType] : ''}
	</button>
	{#if isTabOpen}
		<Tabs
			dir="ver"
			class="border-primary-50-neon absolute bottom-0 w-[100px] translate-y-full"
		>
			{#each _objKeys(GAME_SERVERS) as serverType (serverType)}
				<Tab
					isActive={serverType === $crrServerType}
					on:click={() => onClickTab(serverType)}
				>
					{GAME_SERVERS[serverType]}
				</Tab>
			{/each}
		</Tabs>
	{/if}
</div>
