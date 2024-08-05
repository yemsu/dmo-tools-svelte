<script lang="ts">
	import {
		sealPrices,
		myStats,
		mySeals,
		seals,
		isShowMySealPopup
	} from '$entities/seals/model'
	import { cn } from '$shared/lib'
	import { Section } from '$shared/section'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { Title } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'
	import StatBar from '$widgets/stat-bar/ui/StatBar.svelte'

	$: getTotalMySealPrice = () => {
		let totalPrice = 0
		for (const { sealId, count } of $mySeals) {
			const sumSealPrice =
				($sealPrices.find((sealPrice) => sealPrice.sealId === sealId)?.price ||
					0) * count
			if (sumSealPrice) totalPrice += sumSealPrice
		}
		return totalPrice
	}
</script>

<div
	class={cn(
		'fixed left-0 top-0 flex size-full flex-col justify-end md:justify-center',
		'transition-transform ',
		!$isShowMySealPopup && 'translate-y-full opacity-0'
	)}
>
	<div
		class={cn(
			'absolute left-0 top-0 size-full bg-black/50 backdrop-blur-sm',
			'transition-opacity',
			!$isShowMySealPopup && 'opacity-0'
		)}
		aria-hidden
		on:click={() => isShowMySealPopup.set(!$isShowMySealPopup)}
	></div>
	<Inner class="flex flex-col items-center justify-center">
		<Section
			class={cn(
				'bg-secondary-10 h-[calc(100vh-90px)]',
				'w-full max-w-[650px]',
				'border-t border-t-primary-90 drop-shadow-primary-90'
			)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="popupTitle"
		>
			<div class={cn('relative flex items-center justify-center')}>
				<Title size="sm" id="popupTitle">보유중인 씰 ({$mySeals.length})</Title>
				<button
					class="absolute right-0 top-0"
					on:click={() => isShowMySealPopup.set(!$isShowMySealPopup)}
					title="닫기"
				>
					<iconify-icon
						icon="mdi:close"
						class={$isShowMySealPopup ? 'rotate-90' : '-rotate-90'}
						width={24}
						height={24}
					/>
				</button>
			</div>
			<StatBar stats={$myStats} totalPrice={getTotalMySealPrice()} />
			<SealList seals={$mySeals} let:seal={mySeal}>
				<SealItem seal={getMySealData($seals, mySeal.sealId)} />
				<button
					class="absolute right-[1px] top-[1px]"
					on:click={() => mySeals.remove(mySeal.sealId)}
					title="삭제"
				>
					<iconify-icon icon="mdi:close" width={14} height={14} />
				</button>
			</SealList>
		</Section>
	</Inner>
</div>
