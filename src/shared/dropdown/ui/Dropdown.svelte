<script lang="ts">
	import { cn } from '$shared/lib'
	import { onDestroy, onMount } from 'svelte'

	export let buttonClass: string | null = null
	export let title: string | null = null
	let isDropdownOpen = false
	let dropdownElement: HTMLDivElement
	const { class: className, ...restProps } = $$restProps

	const closeDropdown = () => {
		isDropdownOpen = false
	}

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropdownElement || !isDropdownOpen) return
		const target = e.target as HTMLDivElement
		if (!dropdownElement.contains(target)) {
			closeDropdown()
		}
	}

	onMount(() => {
		document.addEventListener('click', handleOutsideClick)
	})

	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div bind:this={dropdownElement} class={className} {...restProps}>
	<button
		class={cn(buttonClass)}
		on:click={() => (isDropdownOpen = true)}
		{title}
	>
		<slot name="buttonSlot" />
	</button>
	{#if isDropdownOpen}
		<slot name="contentSlot" {closeDropdown} />
	{/if}
</div>
