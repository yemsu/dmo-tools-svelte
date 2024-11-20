<script lang="ts">
	import { cn } from '$shared/lib'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let label: string | undefined = undefined
	export let name: string | undefined = undefined
	export let placeholder: string | undefined = undefined
	export let value: string | number | null
	export let inputElement: HTMLInputElement | null = null
	export let size: 'xs' | 'sm' | 'sm-md' | 'md' = 'md'

	const sizeStyles = {
		xs: 'h-[25px] text-sub-md px-1',
		sm: 'h-[30px] text-sub-md px-1',
		'sm-md': 'h-[30px] text-sub-md md:text-body-sm px-2',
		md: 'h-input-h px-2 text-sub-md md:text-body-md'
	}

	const handleInput = (event: Event) => {
		dispatch('input', event)
	}
	const handleBlur = (event: Event) => {
		dispatch('blur', event)
	}
</script>

<label
	for={name}
	class={cn(
		'label flex items-center gap-2',
		$$restProps.type === 'checkbox' && 'flex-row-reverse'
	)}
>
	{#if label}
		<span class="min-w-[40px]">{label}</span>
	{/if}
	<input
		{...$$restProps}
		placeholder={placeholder || (label && `${label}를 입력하세요`)}
		bind:value
		bind:this={inputElement}
		on:input={handleInput}
		on:blur={handleBlur}
		class={cn('w-full', sizeStyles[size], $$restProps.class)}
	/>
</label>
