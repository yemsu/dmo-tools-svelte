<script lang="ts">
	import { cn } from '$shared/lib'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let label: string | undefined = undefined
	export let value: string | number | undefined = undefined

	const { name, placeholder, class: className } = $$restProps
	const handleInput = (event: Event) => {
		dispatch('input', event)
	}
</script>

<label
	for={name}
	class={cn(
		'label flex items-center gap-2',
		$$restProps.type === 'checkbox' && 'flex-row-reverse',
		className
	)}
>
	{#if label}
		<span class="min-w-[40px]">{label}</span>
	{/if}
	<input
		{...$$restProps}
		placeholder={placeholder || (label && `${label}를 입력하세요`)}
		bind:value
		on:input={handleInput}
	/>
</label>
