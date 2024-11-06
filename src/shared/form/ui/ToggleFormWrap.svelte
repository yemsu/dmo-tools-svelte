<script lang="ts">
	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { delay } from '$shared/lib'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	type T = $$Generic
	export let text: string
	export let value: string
	export let placeholder: string
	export let isValid: boolean
	export let onsubmit: () => Promise<T | undefined>
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
		await onsubmit()
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
					bg="submit-secondary"
					disabled={!isValid}
				>
					<TextByLang text="완료" engText="Done" />
				</Button>
				<Button
					type="button"
					size="md-lg"
					rounded="md"
					bg="gray"
					on:click={onClickCancel}
				>
					<TextByLang text="취소" engText="Cancel" />
				</Button>
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
		on:click={onClickEdit}
	>
		<TextByLang text="수정" engText="Edit" />
	</Button>
{/if}
