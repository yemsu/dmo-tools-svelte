<script lang="ts">
	import { cn } from '$shared/lib'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { _ } from 'svelte-i18n'

	export let size: 'sm' | 'md' | 'lg' = 'md'
	let isPopupVisible = false

	const sizeStyles = {
		sm: '',
		md: 'max-w-[500px]',
		lg: 'max-w-[700px]'
	}

	const toggleModal = () => {
		isPopupVisible = !isPopupVisible
	}
</script>

<slot name="buttonSlot" {toggleModal}></slot>
{#if isPopupVisible}
	<div
		class="bg-dim fixed left-0 top-0 z-dim size-full bg-secondary-5/30 backdrop-blur-sm"
		on:click={() => (isPopupVisible = false)}
	></div>
	<Inner class="position-fix-center flex-center z-modal w-full">
		<div
			class={cn(
				'relative rounded-md border border-primary-20 bg-secondary-5 p-6',
				sizeStyles[size]
			)}
		>
			<slot name="popupContent"></slot>
			<button
				on:click={() => (isPopupVisible = false)}
				class="absolute right-3 top-3"
				title={$_('close_popup')}
			>
				<iconify-icon icon="mdi:close" width={20} height={20} />
			</button>
		</div>
	</Inner>
{/if}
