<script lang="ts">
	import { goto } from '$app/navigation'
	import { mySealPrices, type SealData, type SealPrice } from '$entities/seals'
	import { user } from '$entities/user'
	import { PriceChartPopup } from '$features/calculator/display-price-chart'
	import SealItemPriceText from '$features/calculator/display-seal-list/ui/SealItemPriceText.svelte'
	import EditMyPriceForm from '$features/calculator/update-my-price/ui/EditMyPriceForm.svelte'
	import { getMyAndFinalPrice } from '$features/calculator/update-my-seal'
	import { Button } from '$shared/button'
	import { PATH, TOAST } from '$shared/config'
	import { cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'
	import DeleteMyPriceButton from './DeleteMyPriceButton.svelte'

	export let sealPrices: SealPrice[]
	export let seal: SealData
	export let isEditable: boolean = true
	let sealId = seal.id
	let isOnInput = false
	$: isKr = $lang === 'kr'
	$: prices = getMyAndFinalPrice(sealPrices, $mySealPrices, sealId)

	const onClickInputOn = () => {
		if (!$user) {
			goto(`${$langPath}${PATH.LOGIN}`)
			toast.on(TOAST.NEED_LOGIN[$lang])
			return
		}
		isOnInput = true
	}
</script>

<div class="w-full">
	{#if isOnInput}
		<EditMyPriceForm
			price={prices.final}
			{sealId}
			hideInput={() => (isOnInput = false)}
		/>
	{:else}
		<div class="relative flex w-full overflow-hidden rounded-sm">
			{#if prices.my !== undefined}
				<DeleteMyPriceButton {sealId} />
			{/if}
			<Button
				type="button"
				size="xs"
				variant="background"
				class={cn(
					'flex-center flex-1 gap-1 rounded-l-none rounded-r-none px-1'
				)}
				title={$_('seal.edit_seal_price')}
				on:click={onClickInputOn}
				disabled={!isEditable}
			>
				<SealItemPriceText price={prices.final} />
			</Button>
			<!-- vpn 사용 불가하게되어 영문판은 가격 그래프 비노출 -->
			{#if isKr}
				<PriceChartPopup {seal} />
			{/if}
		</div>
	{/if}
</div>
