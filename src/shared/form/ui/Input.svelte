<script lang="ts">
	import { cn } from '$shared/lib'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let label: string | undefined = undefined
	export let placeholder: string | undefined
	export let value: string | number | null = null
	export let inputElement: HTMLInputElement | null = null
	export let size: 'xs' | 'sm' | 'md' = 'md'

	const { name, class: className, ...restProps } = $$restProps

	const sizeStyles = {
		xs: 'h-[25px] text-xs',
		sm: 'h-[30px] text-xs',
		md: 'h-input-h px-2 text-md'
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
		$$restProps.type === 'checkbox' && 'flex-row-reverse',
		className
	)}
>
	{#if label}
		<span class="min-w-[40px]">{label}</span>
	{/if}
	<input
		placeholder={placeholder || (label && `${label}를 입력하세요`)}
		bind:value
		bind:this={inputElement}
		on:input={handleInput}
		on:blur={handleBlur}
		class={cn('w-full', sizeStyles[size], className)}
		{...restProps}
	/>
</label>
