<script lang="ts">
	import { myStats } from '$entities/seals'
	import { calc } from '$features/calculate-seal-efficiency'
	import { cn, numberFormatter } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { StatBarTotalPrice } from '$widgets/stat-bar'

	export let isPercentType: boolean
	const EFF_TOTAL_FIXED = 10
	$: crrWillGetStatTotal = $calc.resultTotal.willGetStat
	$: crrEfficiencyTotal = +(
		$calc.resultTotal.efficiency / $calc.calcResults.merged.length
	).toFixed(EFF_TOTAL_FIXED)
	$: calcResultStatTotal =
		$myStats[$calc.statTypeSelected] + crrWillGetStatTotal

	$: values = [
		{
			title: { kr: '현재 내 능력치', en: 'Current Stats' },
			value: numberFormatter($myStats[$calc.statTypeSelected]),
			afterMark: '+'
		},
		{
			title: { kr: '얻어야하는 능력치', en: 'Required Stats' },
			value: numberFormatter(crrWillGetStatTotal),
			afterMark: '='
		},
		{
			title: { kr: '최종 능력치', en: 'Final Stats' },
			value: numberFormatter(calcResultStatTotal, 5)
		}
	]

	$: resultUnit = isPercentType ? '%' : ''
</script>

<div
	class={cn(
		'flex-center fixed z-toast text-center',
		'left-[var(--result-l)]',
		'bottom-[var(--result-b)]',
		'w-[var(--result-area-w)]'
	)}
>
	<section
		class={cn(
			'h-calc-result-h w-[var(--result-w)] overflow-hidden',
			'port:flex-col land:rounded-full',
			'rounded-md border-2 border-gray-10 bg-deep drop-shadow-lg'
		)}
	>
		<h2 class="ir">
			<TextByLang
				text="계산 결과 - 총 능력치, 총 비용"
				engText="Calculation Results - Total Stats, Total Cost "
			/>
		</h2>
		<div class="flex flex-wrap">
			<div class="flex-center flex-1 p-2 land:p-4">
				<p class="flex-center gap-2 text-body-md leading-none">
					{#each values as value (value.title.kr)}
						<span class="flex flex-col gap-[2px] whitespace-nowrap land:gap-1">
							<span class="text-sub-md text-gray-11">
								{value.title[$lang]}
							</span>
							<span class="text-body-sm font-bold text-point land:text-body-lg">
								{value.value}{resultUnit}
							</span>
						</span>
						{#if value.afterMark}
							<span>{value.afterMark}</span>
						{/if}
					{/each}
				</p>
			</div>
			<div
				class="flex-center w-full bg-background land:w-[40%] land:flex-col land:gap-1 land:p-1"
			>
				<p class="port:flex-center port:flex-1 port:p-1">
					<StatBarTotalPrice totalPrice={$calc.resultTotal.willNeedMoney} />
				</p>
				<p
					class={cn(
						'port:flex-center leading-[1.2] port:h-full port:flex-col port:border-l-2 port:border-deep port:px-3 port:py-1',
						'text-sub-lg text-gray-10'
					)}
				>
					<span>평균 효율: {crrEfficiencyTotal}</span>
				</p>
			</div>
		</div>
	</section>
</div>
