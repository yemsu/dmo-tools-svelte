<script lang="ts">
	import type { UserResponse } from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { delay } from '$shared/lib'

	export let text: string
	export let value: string | null
	export let placeholder: string
	export let isValid: boolean
	export let onsubmit: () => Promise<UserResponse | undefined>
	export let resetValue: () => void

	let isInputVisible = false
	let inputElement: HTMLInputElement

	const onClickEdit = async () => {
		isInputVisible = true
		await delay(50)
		inputElement.focus()
	}

	const onClickCancel = () => {
		isInputVisible = false
		resetValue()
	}

	const onsubmitHandler = async () => {
		const isOnSubmit = await onsubmit()
		if (!isOnSubmit) return
		isInputVisible = false
	}
</script>

{#if isInputVisible}
	<div class="flex flex-col gap-2">
		<form on:submit|preventDefault={onsubmitHandler} class="flex gap-1">
			<Input bind:value bind:inputElement size="sm-md" {placeholder} />
			<div class="flex gap-1">
				<Button
					size="md-lg"
					rounded="md"
					class="bg-primary-30"
					disabled={!isValid}
				>
					완료
				</Button>
				<Button
					type="button"
					size="md-lg"
					rounded="md"
					class="bg-gray-500"
					on:click={onClickCancel}>취소</Button
				>
			</div>
		</form>
		<slot name="validationText"></slot>
	</div>
{:else}
	<span>{text}</span>
	<Button
		size="md-lg"
		rounded="md"
		class="ml-auto bg-primary-30"
		on:click={onClickEdit}>수정</Button
	>
{/if}
