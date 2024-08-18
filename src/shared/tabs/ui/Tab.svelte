<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: boolean
	const { class: className, ...restProps } = $$restProps
</script>

<li class="h-full flex-1">
	<button
		type="button"
		class={cn(
			'size-full whitespace-nowrap rounded-md px-2 py-1.5 font-semibold transition-colors md:min-w-[45px]',
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
