<script lang="ts">
	import { isShowMySealPopup } from '$entities/seals'
	import { cn } from '$shared/lib'
	import Inner from '$shared/section/ui/Inner.svelte'
</script>

<div
	class={cn(
		'fixed left-0 top-0 z-modal size-full',
		'transition-opacity',
		!$isShowMySealPopup && 'translate-x-full opacity-0'
	)}
>
	<button
		class={cn(
			'absolute left-0 top-0 size-full bg-secondary-5/60 backdrop-blur-sm',
			'transition-opacity'
		)}
		on:click={() => isShowMySealPopup.set(false)}
		title="팝업 닫기"
	></button>
	<div
		class={cn(
			'absolute left-1/2 top-1/2 z-modal -translate-x-1/2 -translate-y-1/2 ',
			'flex flex-col justify-end md:justify-center',
			'rounded-md bg-secondary-5 p-5 md:min-h-[400px] md:min-w-[400px]'
		)}
	>
		<Inner size="full" class="flex flex-col items-center justify-center">
			<slot></slot>
		</Inner>
	</div>
</div>
