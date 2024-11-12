<script lang="ts">
	import { cn } from '$shared/lib'
	const { class: className } = $$restProps

	export let startDate: string
	export let visibleDay: number = 1
	export let position: 'left' | 'right' = 'right'

	const positionStyles = {
		left: 'left-0 translate-x-[-60%]',
		right: 'right-0 translate-x-[120%]'
	}

	$: isNew = (() => {
		const created = new Date(startDate)
		if (!created.getTime()) return false
		const now = new Date()
		const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
		return diffHours <= 24 * visibleDay
	})()
</script>

{#if isNew}
	<span
		class={cn(
			'flex-center absolute top-0 -translate-y-[40%]',
			'aspect-square w-[1.5em]',
			'rounded-full bg-red text-[6px] text-gray-200 md:text-[8px]',
			positionStyles[position],
			className
		)}
	>
		N
	</span>
{/if}
