<!-- src/components/ProgressBar.svelte -->
<script>
	import { navigating } from '$app/stores'
	import { cn } from '$shared/lib'
	import { tweened } from 'svelte/motion'

	const progress = tweened(0, {
		duration: 200
	})

	$: if ($navigating) {
		progress.set(70)
	} else {
		progress.set(100).then(() => {
			setTimeout(() => {
				progress.set(0, { duration: 0 })
			}, 200)
		})
	}
</script>

<div
	class={cn(
		'z-progress-bar pointer-events-none fixed left-0 top-0 h-[2px] w-full overflow-hidden transition-opacity duration-200',
		$progress > 0 ? 'opacity-100' : 'opacity-0'
	)}
>
	<div
		class="h-full bg-blue-6 transition-transform"
		style="transform: translateX({-100 + $progress}%)"
	/>
</div>
