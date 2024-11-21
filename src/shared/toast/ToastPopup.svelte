<script lang="ts">
	import { cn } from '$shared/lib'
	import { toast } from '$shared/toast'
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
			'rounded-md text-center drop-shadow-lg',
			'transition-all',
			!isToastOn && 'translate-y-full opacity-0'
		)}
	>
		{$toast}
	</p>
{/if}
