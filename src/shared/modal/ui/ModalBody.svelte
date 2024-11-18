<script lang="ts">
	import { cn } from '$shared/lib'
	import { _ } from 'svelte-i18n'

	export let hideModal: () => void
	export let size: 'sm' | 'md' | 'lg' = 'md'

	const sizeStyles = {
		sm: 'w-[300px] text-center',
		md: 'w-[500px]',
		lg: 'w-[600px]'
	}
</script>

<button
	class="bg-dim fixed left-0 top-0 z-dim size-full bg-gray-2/40 backdrop-blur-md"
	on:click={hideModal}
></button>
<div
	class={cn(
		'position-fix-center z-modal max-w-full p-6',
		'rounded-md bg-background drop-shadow-lg',
		sizeStyles[size]
	)}
>
	<slot></slot>
	<button
		on:click={hideModal}
		class="absolute right-3 top-3"
		title={$_('close_popup')}
	>
		<iconify-icon icon="mdi:close" width={20} height={20} />
	</button>
</div>
