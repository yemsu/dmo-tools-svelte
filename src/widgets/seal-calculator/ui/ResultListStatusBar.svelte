<script lang="ts">
	import { calc } from '$features/calculate-seal-efficiency'
	import { cn, intersectionObserver } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { Tooltip } from '$shared/tooltip'
	import { Switch } from '$shared/ui/switch'
	import { CalcReferText } from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'

	let isStatusBarHide = false

	const onMergeSwitchChange = (e: CustomEvent) => {
		calc.toggleViewMode(e.detail)
	}

	const onClosestSwitchChange = (e: CustomEvent) => {
		calc.toggleCalcMode(e.detail)
	}

	const onStatusBarHide = (isIntersecting: boolean) => {
		isStatusBarHide = !isIntersecting
	}
</script>

<div
	class="observer-target mb-2"
	use:intersectionObserver={{
		target: '.observer-target',
		threshold: 0,
		rootMargin: '0px',
		onIntersect: onStatusBarHide
	}}
>
	<div
		class={cn(
			'flex items-center justify-between',
			isStatusBarHide &&
				'fixed left-[--result-l] top-[calc(var(--header-h)+var(--raid-bar-h))] z-toast w-[var(--result-area-w)] bg-background py-3 land:top-0'
		)}
	>
		<CalcReferText />
		<div class="flex gap-4">
			<Switch
				id="merge-switch"
				leftText={$_('seal.separate_same_seal')}
				rightText={$_('seal.merge_same_seal')}
				defaultChecked={$calc.viewMode === 'merged'}
				width="4em"
				on:change={onMergeSwitchChange}
			/>
			<div class="flex items-center gap-0.5">
				<div class="flex-center relative gap-4">
					<button
						class={cn(
							'flex-center peer/tooltip gap-0.5 text-right',
							'text-sub-lg text-gray-11 land:text-left'
						)}
						aria-describedby="price-tooltip"
					>
						<iconify-icon icon="ic:outline-info" width={14} height={14} />
					</button>
					<Tooltip
						id="price-tooltip"
						class="-bottom-2 right-0 w-[240px] translate-x-1/2 translate-y-full pr-2"
					>
						<p>
							{#if $lang === 'kr'}
								<span class="text-point">루체 서버</span>를 기준으로, 각 씰의
								<span class="text-point">위탁 거래소 1페이지 매물 가격</span>의
								가중 평균으로 책정됩니다. <br />
								가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
								<span class="text-point">구매 전 확인</span>이 필요합니다.
							{:else}
								Based on the <span class="text-point"
									>Omega server of the Steam version</span
								>, seal prices are set using the weighted average of listings
								<span class="text-point"
									>on the first data of the marketplace</span
								>. However, due to potential price fluctuations or listing
								errors, there’s a chance that the prices may not be accurate.
								Please
								<span class="text-point"> verify the prices </span> before making
								any purchases.
							{/if}
						</p>
					</Tooltip>
				</div>
				<Switch
					id="closest-switch"
					leftText={$_('seal.efficiency_result')}
					rightText={$_('seal.closest_result')}
					defaultChecked={$calc.calcMode === 'closest'}
					width="5em"
					on:change={onClosestSwitchChange}
					disabled={$calc.calcResults.closest.separated.length === 0}
				/>
			</div>
		</div>
	</div>
</div>
