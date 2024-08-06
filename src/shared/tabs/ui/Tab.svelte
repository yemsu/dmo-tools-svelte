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
				? 'bg-secondary-10'
				: 'opacity-30 hover:bg-secondary-10/60 hover:opacity-100',
			className
		)}
		on:click
		{...restProps}
	>
		<slot></slot>
	</button>
</li>
