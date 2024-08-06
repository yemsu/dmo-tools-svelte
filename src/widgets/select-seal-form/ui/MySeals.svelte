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
		for (const { id, count } of $mySeals) {
			const sumSealPrice =
				($sealPrices.find((sealPrice) => sealPrice.sealId === id)?.price || 0) *
				count
			if (sumSealPrice) totalPrice += sumSealPrice
		}
		return totalPrice
	}
</script>

<div
	class={cn(
		'fixed right-0 top-header-h flex flex-col justify-end md:justify-center',
		'transition-opacity ',
		!$isShowMySealPopup && 'opacity-0 md:translate-x-full'
	)}
>
	<Inner size="full" class="flex flex-col items-center justify-center">
		<Section
			class={cn(
				'h-[calc(100vh-90px)] bg-secondary-10',
				'w-full max-w-[650px]',
				'border border-primary-90/70 border-l-transparent border-r-transparent drop-shadow-primary-90'
			)}
			role="dialog"
			aria-modal="true"
			aria-labelledby="popupTitle"
		>
			<div class={cn('relative flex items-center justify-center')}>
				<Title size="sm" id="popupTitle">보유 씰 ({$mySeals.length})</Title>
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
			<SealList
				seals={$mySeals}
				let:seal={mySeal}
				noDataText="세팅된 보유 씰이 없습니다."
			>
				<SealItem seal={getMySealData($seals, mySeal.id)}
					><button
						class="absolute right-[1px] top-[1px]"
						on:click={() => mySeals.remove(mySeal.id)}
						title="삭제"
					>
						<iconify-icon icon="mdi:close" width={14} height={14} />
					</button></SealItem
				>
			</SealList>
		</Section>
	</Inner>
</div>
