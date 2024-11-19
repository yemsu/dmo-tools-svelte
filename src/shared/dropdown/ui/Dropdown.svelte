<script lang="ts">
	import { browser } from '$app/environment'
	import { afterNavigate } from '$app/navigation'
	import { cn } from '$shared/lib'
	import { onDestroy, onMount } from 'svelte'

	export let menuBoxAlign: 'left' | 'center' | 'right' = 'left'
	let isDropdownOpen = false
	let dropdownElement: HTMLDivElement
	let menuElement: HTMLDivElement
	let shouldShowAbove = false
	const { class: className, ...restProps } = $$restProps

	const menuBoxAlignStyles = {
		left: 'left-0',
		center: 'left-1/2 -translate-x-1/2',
		right: 'right-0'
	}

	const closeDropdown = () => {
		isDropdownOpen = false
	}

	const calculatePosition = () => {
		if (!menuElement || !dropdownElement) return

		const dropdownRect = dropdownElement.getBoundingClientRect()
		const menuRect = menuElement.getBoundingClientRect()
		const viewportHeight = window.innerHeight

		const spaceBelow = viewportHeight - dropdownRect.bottom
		const spaceAbove = dropdownRect.top

		shouldShowAbove = menuRect.height > spaceBelow && spaceAbove > spaceBelow
	}

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen
		if (isDropdownOpen) {
			setTimeout(calculatePosition, 0)
		}
	}

	const handleOutsideClick = (e: MouseEvent) => {
		if (!dropdownElement || !isDropdownOpen) return
		const target = e.target as HTMLDivElement
		if (!dropdownElement.contains(target)) {
			closeDropdown()
		}
	}

	const handleResize = () => {
		if (isDropdownOpen) {
			calculatePosition()
		}
	}

	onMount(() => {
		if (!browser) return
		document.addEventListener('click', handleOutsideClick)
		window.addEventListener('resize', handleResize)
		window.addEventListener('scroll', handleResize)
	})

	onDestroy(() => {
		if (!browser) return
		document.removeEventListener('click', handleOutsideClick)
		window.removeEventListener('resize', handleResize)
		window.removeEventListener('scroll', handleResize)
	})

	afterNavigate(() => {
		if (isDropdownOpen) isDropdownOpen = false
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
			bind:this={menuElement}
			class={cn(
				'absolute z-tooltip rounded-md border border-gray-3 bg-gray-3 drop-shadow-lg',
				shouldShowAbove
					? 'bottom-full -translate-y-1'
					: '-bottom-1 translate-y-full',
				menuBoxAlignStyles[menuBoxAlign]
			)}
		>
			<slot name="contentSlot" {closeDropdown} />
		</div>
	{/if}
</div>
