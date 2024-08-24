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
	<div class="flex-center absolute bottom-gnb-h z-toast mb-3 w-full">
		<p
			class={cn(
				'min-w-[200px] p-3',
				'border2-primary-50-neon bg-secondary-5/90',
				'text-center text-sm',
				'rounded-md backdrop-blur-sm',
				'transition-all',
				isToastOn ? '' : 'translate-y-full opacity-0'
			)}
		>
			{$toast}
		</p>
	</div>
{/if}
