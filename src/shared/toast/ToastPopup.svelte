<script lang="ts">
	import { cn } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { quintOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'
	let isToastOn = !!$toast

	const toggleIsVisible = () => {
		setTimeout(() => {
			isToastOn = !!$toast
		}, 50)
	}

	$: $toast && toggleIsVisible()
</script>

{#if $toast}
	<p
		class={cn(
			'fixed bottom-gnb-h left-1/2 z-toast mb-3 min-w-[200px] -translate-x-1/2 p-3',
			'border border-blue-6 bg-background/80',
			'text-balance break-keep rounded-md text-center drop-shadow-lg',
			'transition-all',
			!isToastOn && 'translate-y-full opacity-0'
		)}
		transition:fly={{ y: 30, duration: 300, easing: quintOut }}
	>
		{$toast}
	</p>
{/if}
