<script lang="ts">
	import { goto } from '$app/navigation'
	import { mySealPrices, type SealPrice } from '$entities/seals'
	import { user } from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { ALERT, CONFIRM, PATH, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { toast } from '$shared/toast'
	import { getMyAndFinalPrice } from '$features/update-my-seal'
	import SealItemPriceText from '$widgets/seal-list/ui/SealItemPriceText.svelte'
	import { _ } from 'svelte-i18n'

	export let sealPrices: SealPrice[]
	export let sealId: number
	export let isEditable: boolean = true
	$: isKr = $lang === 'kr'
	$: prices = getMyAndFinalPrice(sealPrices, $mySealPrices, sealId)
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		if (!$user) {
			goto(`${$langPath}${PATH.LOGIN}`)
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
		<form on:submit|preventDefault={onSubmit} class="flex gap-1">
			<Input
				bind:inputElement
				size="xs"
				type="number"
				id={`price-${sealId}`}
				step="0.1"
				placeholder={isKr ? '씰 가격' : 'Seal Price'}
				bind:value={inputValue}
				on:input={checkPriceInputValue}
				on:blur|once={onBlurInput}
			/>
			<Button size="xs" variant="blue" type="submit">
				{$_('done')}
			</Button>
		</form>
	{:else}
		<div class="flex w-full rounded-sm">
			{#if prices.my !== undefined}
				<button
					class="flex-center w-[35%] shrink-0 rounded-l-sm bg-warning"
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
			<Button
				type="button"
				size="xs"
				variant="background"
				class={cn(
					'flex-1',
					prices.my && 'rounded-l-none border-l-0',
					priceStyle
				)}
				title={isEditable
					? isKr
						? '씰 가격 수정하기'
						: 'Edit Seal Price'
					: ''}
				on:click={onClickInputOn}
				disabled={!isEditable}
			>
				<SealItemPriceText price={prices.final} />
			</Button>
		</div>
	{/if}
</div>
