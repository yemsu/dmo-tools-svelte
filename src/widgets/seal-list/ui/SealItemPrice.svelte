<script lang="ts">
	import { myPrices, sealPrices } from '$entities/seals'
	import { cn } from '$shared/lib'
	import SealItemPriceText from '$widgets/seal-list/ui/SealItemPriceText.svelte'

	export let sealId: number
	export let isEditable: boolean = true
	$: price = $sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price
	$: myPrice = $myPrices.find(({ id }) => id === sealId)?.price
	$: finalPrice = myPrice === undefined ? price : myPrice
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
		if (inputValue && inputValue < 0) {
			inputValue = 0
		}
	}

	const onSubmit = () => {
		if (inputValue === null) {
			alert('변경할 가격을 입력해주세요.')
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			myPrices.updatePrice(sealId, inputValue)
			isOnInput = false
		}
	}

	const onBlurInput = () => {
		inputValue = null
		isOnInput = false
	}
	const priceStyle = 'flex-center min-w-[60%] gap-1 px-1'
</script>

<div class="w-full min-w-[80%] md:w-auto">
	{#if isOnInput}
		<form on:submit|preventDefault={onSubmit} class="flex gap-1">
			<input
				bind:this={inputElement}
				type="number"
				id={`price-${sealId}`}
				class={cn(
					'w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white'
				)}
				step="0.1"
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
		<div class="flex w-full overflow-hidden rounded-md">
			{#if myPrice !== undefined}
				<button
					class="flex-center bg-warning w-[35%] shrink-0"
					on:click={() => myPrices.remove(sealId)}
				>
					<iconify-icon
						icon="clarity:lock-solid"
						width={14}
						height={14}
						title="가격 설정 제거 (서버 가격 로딩)"
					/>
				</button>
			{/if}
			<button
				type="button"
				class="flex-1 bg-primary-20/50 py-1.5 md:py-1 {priceStyle}"
				title="씰 가격 수정하기"
				on:click={onClickInputOn}
			>
				<SealItemPriceText price={finalPrice} />
			</button>
		</div>
	{:else}
		<p class={cn(priceStyle)}>
			{#if myPrice !== undefined}
				<iconify-icon
					title="저장됨"
					icon="material-symbols:lock-outline"
					width={15}
					height={15}
				/>
			{/if}
			<SealItemPriceText price={finalPrice} />
		</p>
	{/if}
</div>
