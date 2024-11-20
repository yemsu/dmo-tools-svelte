<script lang="ts">
	import { Icon } from '$shared/icon'
	import { _ } from 'svelte-i18n'

	import { onMount } from 'svelte'

	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { cn, delay } from '$shared/lib'

	type T = $$Generic
	export let value: string
	export let placeholder: string
	export let isValid: boolean
	export let onsubmit: () => Promise<T | undefined>
	export let reset: () => void
	export let defaultText: string | undefined = undefined
	export let size: 'md' | 'lg' = 'md'

	let isInputVisible = false
	let inputElement: HTMLInputElement
	let formElement: HTMLFormElement

	const clickEditOn = async () => {
		isInputVisible = true
		await delay(50)
		inputElement.focus()
	}

	const onsubmitHandler = async () => {
		if (!isValid) return
		await onsubmit()
		isInputVisible = false
	}

	$: onClickOutward = (e: Event) => {
		if (!isInputVisible) return
		const target = e.target as HTMLElement
		if (!formElement.contains(target)) {
			isInputVisible = false
			reset()
		}
	}

	onMount(() => {
		document.addEventListener('mousedown', onClickOutward)
	})
</script>

{#if isInputVisible}
	<div class={cn('flex w-full flex-col gap-2')}>
		<slot name="upperForm"></slot>
		<form
			bind:this={formElement}
			on:submit|preventDefault={onsubmitHandler}
			class="flex w-full gap-1"
		>
			<Input
				bind:value
				bind:inputElement
				type={$$restProps.type}
				step={$$restProps.step}
				size={size === 'md' ? 'sm-md' : 'md'}
				{placeholder}
				class="w-full"
			/>

			{#if size === 'md'}
				<Button
					size="icon"
					rounded="md"
					variant={!isValid ? 'outline' : 'blue'}
					disabled={!isValid}
					title={$_('done')}
				>
					<Icon icon="material-symbols:check" />
				</Button>
			{:else}
				<Button
					size="lg"
					rounded="md"
					variant={!isValid ? 'gray' : 'blue'}
					disabled={!isValid}
				>
					{$_('done')}
				</Button>
			{/if}
		</form>
		<slot name="validationText"></slot>
	</div>
{:else}
	{#if defaultText}
		<span class="w-full">{defaultText}</span>
	{:else if $$slots.defaultText}
		<slot name="defaultText"></slot>
	{/if}
	{#if $$slots.button}
		<slot name="button" {clickEditOn}></slot>
	{:else}
		<Button
			size="icon"
			rounded="md"
			variant="outline"
			title={$_('edit')}
			on:click={clickEditOn}
		>
			<Icon icon="tdesign:edit" />
		</Button>
	{/if}
{/if}
