<script lang="ts">
	import { cn } from '$shared/lib'

	type T = $$Generic
	export let tabButtons: T[]
	export let keyName: (tabButton: T) => string
	export let styleByTabButtons: (tabButton: T) => string
	export let isActive: (tabButton: T) => boolean
	export let buttonTitle: (tabButton: T) => string
	export let onClick: (tabButton: T) => void
	const { class: className, ...restProps } = $$restProps
</script>

<menu class="overflow-hidde flex items-center rounded-md bg-gray-700 p-1">
	{#each tabButtons as tabButton (keyName(tabButton))}
		<li>
			<button
				type="button"
				class={cn(
					'w-[50px] rounded-md py-1 font-bold transition-colors',
					styleByTabButtons(tabButton),
					isActive(tabButton)
						? 'bg-black/90'
						: 'opacity-30 hover:bg-black/50 hover:opacity-100'
				)}
				on:click={() => onClick(tabButton)}
				title={buttonTitle(tabButton)}
				{...restProps}
			>
				<slot {tabButton}></slot>
			</button>
		</li>
	{/each}
</menu>
