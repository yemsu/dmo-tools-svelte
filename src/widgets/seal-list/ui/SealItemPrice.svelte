<script lang="ts">
	import { sealPrices } from '$entities/seals'
	import { cn } from '$shared/lib'
	import SealItemPriceText from '$widgets/seal-list/ui/SealItemPriceText.svelte'

	export let sealId: number
	export let isEditable: boolean = true
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		isOnInput = true
		if (price) {
			inputValue = price
		}
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const checkPriceInputValue = () => {
		if (inputValue && inputValue > 3000) {
			inputValue = 3000
		}
	}

	const onSubmit = () => {
		if (inputValue === null) {
			alert('변경할 가격을 입력해주세요.')
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			sealPrices.updatePrice(sealId, inputValue)
			isOnInput = false
		}
	}

	const onBlurInput = () => {
		inputValue = null
		isOnInput = false
	}
	const priceStyle = 'flex-center min-w-[60%] gap-1 px-1'
</script>

<div class="min-w-[80%]">
	{#if isOnInput}
		<form on:submit|preventDefault={onSubmit} class="flex gap-1">
			<input
				bind:this={inputElement}
				type="number"
				id={`price-${sealId}`}
				class={cn(
					'w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white'
				)}
				placeholder="씰 가격"
				bind:value={inputValue}
				on:input={checkPriceInputValue}
				on:blur|once={onBlurInput}
			/>
			<button
				type="submit"
				class="whitespace-nowrap rounded-sm bg-primary-50 px-2 font-bold text-black md:px-1"
				>완료</button
			>
		</form>
	{:else if isEditable}
		<button
			type="button"
			class={cn('w-full rounded-md bg-primary-20/50 py-1', priceStyle)}
			title="씰 가격 수정하기"
			on:click={onClickInputOn}
		>
			<SealItemPriceText {price} />
		</button>
	{:else}
		<p class={cn(priceStyle)}>
			<SealItemPriceText {price} />
		</p>
	{/if}
</div>
