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
		'position-center z-20 h-[90%] w-[calc(100%-(var(--content-side)*2))] max-w-[500px] md:h-[420px] md:w-full',
		className
	)}
>
	<slot></slot>
	<button
		class="absolute right-2 top-1 text-[yellow] md:top-2"
		on:click={() => dispatch('close')}
		title="닫기"
	>
		<iconify-icon icon="mdi:close" width={20} height={20} />
	</button>
</section>
