<script lang="ts">
	import { page } from '$app/stores'
	import { myPrices } from '$entities/seals'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { toast } from '$shared/toast'
	import SealItemPriceText from '$widgets/seal-list/ui/SealItemPriceText.svelte'
	import { getMyAndFinalPrice } from '$widgets/my-seals'

	export let sealId: number
	export let isEditable: boolean = true

	$: prices = getMyAndFinalPrice($page.data.sealPrices, $myPrices, sealId)
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		isOnInput = true
		if (prices.final) {
			inputValue = prices.final
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
			toast.on('씰 가격이 설정되었습니다. url을 저장해주세요.')
		}
	}

	const onBlurInput = () => {
		setTimeout(() => {
			inputValue = null
			isOnInput = false
		}, 100)
	}

	const removeSavedPrice = () => {
		const isConfirmed = confirm(
			'설정한 가격을 제거하시겠어요? 제거 후에는 서버에 저장된 가격이 노출됩니다.'
		)
		if (!isConfirmed) return
		myPrices.remove(sealId)
		toast.on('씰 가격 설정이 제거되었습니다. url을 저장해주세요.')
	}

	const priceStyle = 'flex-center min-w-[60%] gap-1 px-1'
</script>

<div class="w-full">
	{#if isOnInput}
		<form on:submit|preventDefault={onSubmit} class="flex h-[24px] gap-1">
			<Input
				bind:inputElement
				type="number"
				id={`price-${sealId}`}
				class={cn(
					'w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white'
				)}
				step="0.1"
				placeholder="씰 가격"
				size="xs"
				bind:value={inputValue}
				on:input={checkPriceInputValue}
				on:blur|once={onBlurInput}
			/>
			<button
				type="submit"
				class="whitespace-nowrap rounded-sm bg-primary-50 px-2 font-semibold text-black md:px-1"
				>완료</button
			>
		</form>
	{:else if isEditable}
		<div class="flex w-full overflow-hidden rounded-md">
			{#if prices.my !== undefined}
				<button
					class="flex-center w-[35%] shrink-0 bg-warning"
					on:click={() => removeSavedPrice()}
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
				<SealItemPriceText price={prices.final} />
			</button>
		</div>
	{:else}
		<p class={cn(priceStyle)}>
			{#if prices.my !== undefined}
				<iconify-icon
					title="저장됨"
					icon="material-symbols:lock-outline"
					width={15}
					height={15}
				/>
			{/if}
			<SealItemPriceText price={prices.final} />
		</p>
	{/if}
</div>
