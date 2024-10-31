<script lang="ts">
	import { browser } from '$app/environment'
	import { cn } from '$shared/lib'
	import { onDestroy, onMount } from 'svelte'

	export let menuBoxAlign: 'left' | 'center' | 'right' = 'left'
	let isDropdownOpen = false
	let dropdownElement: HTMLDivElement
	const { class: className, ...restProps } = $$restProps

	const menuBoxAlignStyles = {
		left: 'left-0',
		center: 'left-1/2 -translate-x-1/2',
		right: 'right-0'
	}

	const closeDropdown = () => {
		isDropdownOpen = false
	}

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen
	}

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropdownElement || !isDropdownOpen) return
		const target = e.target as HTMLDivElement
		if (!dropdownElement.contains(target)) {
			closeDropdown()
		}
	}

	onMount(() => {
		if (!browser) return
		document.addEventListener('click', handleOutsideClick)
	})

	onDestroy(() => {
		if (!browser) return
		document.removeEventListener('click', handleOutsideClick)
	})
</script>

<div
	bind:this={dropdownElement}
	class={cn('relative', className)}
	{...restProps}
>
	<slot name="buttonSlot" {toggleDropdown} />
	{#if isDropdownOpen}
		<div
			class={cn(
				'absolute -bottom-1 z-tooltip translate-y-full rounded-md border border-gray-600 bg-gray-700 drop-shadow-lg',
				menuBoxAlignStyles[menuBoxAlign]
			)}
		>
			<slot name="contentSlot" {closeDropdown} />
		</div>
	{/if}
</div>
