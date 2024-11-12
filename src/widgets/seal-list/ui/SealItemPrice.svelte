<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { mySealPrices } from '$entities/seals'
	import { user } from '$entities/user'
	import { ALERT, CONFIRM, PATH, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { toast } from '$shared/toast'
	import { getMyAndFinalPrice } from '$widgets/my-seals'
	import SealItemPriceText from '$widgets/seal-list/ui/SealItemPriceText.svelte'

	export let sealId: number
	export let isEditable: boolean = true
	$: isKr = $lang === 'kr'
	$: prices = getMyAndFinalPrice($page.data.sealPrices, $mySealPrices, sealId)
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		if (!$user) {
			goto(`/${$lang}${PATH.LOGIN}`)
			toast.on(TOAST.NEED_LOGIN[$lang])
			return
		}
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
			alert(ALERT.INPUT_CHANGE_PRICE[$lang])
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			mySealPrices.updatePrice({ id: sealId, price: inputValue }, $lang)
			isOnInput = false
			toast.on(TOAST.SEAL_PRICE_UPDATED[$lang])
		}
	}

	const onBlurInput = () => {
		setTimeout(() => {
			inputValue = null
			isOnInput = false
		}, 100)
	}

	const removeSavedPrice = () => {
		const isConfirmed = confirm(CONFIRM.REMOVE_SEAL_PRICE[$lang])
		if (!isConfirmed) return
		mySealPrices.remove(sealId)
		toast.on(TOAST.REMOVED_SEAL_PRICE[$lang])
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
				class={cn('w-full rounded-sm bg-primary-20 px-1 py-[1px] text-white')}
				step="0.1"
				placeholder={isKr ? '씰 가격' : 'Seal Price'}
				size="xs"
				bind:value={inputValue}
				on:input={checkPriceInputValue}
				on:blur|once={onBlurInput}
			/>
			<button
				type="submit"
				class="whitespace-nowrap rounded-sm bg-primary-50 px-2 font-semibold text-black md:px-1"
			>
				<TextByLang text="완료" engText="Done" />
			</button>
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
						title={isKr
							? '가격 설정 제거 (서버 가격 로딩)'
							: 'Remove Price Setting (Loading Server Price)'}
					/>
				</button>
			{/if}
			<button
				type="button"
				class="flex-1 bg-primary-20/50 py-1.5 md:py-1 {priceStyle}"
				title={isKr ? '씰 가격 수정하기' : 'Edit Seal Price'}
				on:click={onClickInputOn}
			>
				<SealItemPriceText price={prices.final} />
			</button>
		</div>
	{:else}
		<p class={cn(priceStyle)}>
			{#if prices.my !== undefined}
				<iconify-icon
					title={isKr ? '저장됨' : 'Saved'}
					icon="material-symbols:lock-outline"
					width={15}
					height={15}
				/>
			{/if}
			<SealItemPriceText price={prices.final} />
		</p>
	{/if}
</div>
