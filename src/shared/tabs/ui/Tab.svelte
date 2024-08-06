<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: boolean
	const { class: className, ...restProps } = $$restProps
</script>

<li>
	<button
		type="button"
		class={cn(
			'min-w-[45px] rounded-md px-2 py-1 font-bold transition-colors md:py-1.5',
			isActive
				? 'bg-black/90'
				: 'opacity-30 hover:bg-black/50 hover:opacity-100',
			className
		)}
		on:click
		{...restProps}
	>
		<slot></slot>
	</button>
</li>
