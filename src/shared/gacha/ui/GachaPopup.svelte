<script lang="ts">
	import { cn } from '$shared/lib'
	import { createEventDispatcher, onDestroy, onMount } from 'svelte'

	let popupElement: HTMLElement

	const dispatch = createEventDispatcher()
	const { class: className } = $$restProps

	const handleOutsideClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement
		if (!popupElement.contains(target)) {
			dispatch('close')
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			dispatch('close')
		}
	}

	onMount(() => {
		setTimeout(() => {
			document.addEventListener('click', handleOutsideClick)
			document.addEventListener('keyup', onKeyUp)
		}, 100)
	})

	onDestroy(() => {
		document.removeEventListener('click', handleOutsideClick)
		document.removeEventListener('keyup', onKeyUp)
	})
</script>

<section
	bind:this={popupElement}
	class={cn(
		'position-fix-center land:position-center z-modal h-[60vh] w-[calc(100%-(var(--content-side)*2))] max-w-[550px] land:h-[550px] land:w-full',
		className
	)}
>
	<slot></slot>
	<button
		class="button-hover absolute right-2 top-1 text-[yellow] land:right-3 land:top-3"
		on:click={() => dispatch('close')}
		title="닫기"
	>
		<iconify-icon icon="mdi:close" width={20} height={20} />
	</button>
</section>
