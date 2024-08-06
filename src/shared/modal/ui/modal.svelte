<script lang="ts">
	import { isShowMySealPopup } from '$entities/seals'
	import { cn } from '$shared/lib'
	import Inner from '$shared/section/ui/Inner.svelte'
</script>

<div
	class={cn(
		'fixed right-0 top-header-h flex flex-col justify-end md:justify-center',
		'transition-opacity ',
		!$isShowMySealPopup && 'opacity-0 md:translate-x-full'
	)}
>
	<Inner size="full" class="flex flex-col items-center justify-center">
		<slot></slot>
		<button
			class="absolute right-0 top-0"
			on:click={() => isShowMySealPopup.set(!$isShowMySealPopup)}
			title="닫기"
		>
			<iconify-icon
				icon="mdi:close"
				class={$isShowMySealPopup ? 'rotate-90' : '-rotate-90'}
				width={24}
				height={24}
			/>
		</button>
	</Inner>
</div>
