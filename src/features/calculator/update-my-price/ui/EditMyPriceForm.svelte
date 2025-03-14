<script lang="ts">
	import { mySealPrices } from '$entities/seals'
	import { Button } from '$shared/button'
	import { ALERT, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { onMount } from 'svelte'
	import { _ } from 'svelte-i18n'

	export let sealId: number
	export let price: number
	export let hideInput: () => void
	let inputValue: number | null = null
	let inputElement: HTMLInputElement

	const checkPriceInputValue = () => {
		if (inputValue && inputValue < 0) {
			inputValue = 0
		}
	}

	const onBlurInput = () => {
		setTimeout(() => {
			inputValue = null
			hideInput()
		}, 100)
	}

	const onSubmit = () => {
		if (inputValue === null) {
			alert(ALERT.INPUT_CHANGE_PRICE[$lang])
			setTimeout(() => {
				inputElement.focus()
			}, 100)
		} else {
			mySealPrices.updatePrice({ id: sealId, price: inputValue }, $lang)
			hideInput()
			toast.on(TOAST.SEAL_PRICE_UPDATED[$lang])
		}
	}

	onMount(() => {
		if (price) {
			inputValue = price
		}
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	})
</script>

<form on:submit|preventDefault={onSubmit} class="flex gap-1">
	<Input
		bind:inputElement
		size="xs"
		type="number"
		id={`price-${sealId}`}
		step="0.1"
		placeholder={$_('seal.seal_price')}
		bind:value={inputValue}
		on:input={checkPriceInputValue}
		on:blur|once={onBlurInput}
	/>
	<Button size="xs" variant="blue" type="submit">
		{$_('done')}
	</Button>
</form>
