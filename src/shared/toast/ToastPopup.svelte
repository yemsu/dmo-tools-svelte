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
				'border-2 border-primary-50 bg-secondary-5/90',
				'text-center text-sm',
				'rounded-md drop-shadow-primary-50 backdrop-blur-sm',
				'transition-all',
				isToastOn ? '' : 'translate-y-full opacity-0'
			)}
		>
			{$toast}
		</p>
	</div>
{/if}
