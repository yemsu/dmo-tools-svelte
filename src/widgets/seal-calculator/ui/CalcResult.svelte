<script lang="ts">
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { StatBarTotalPrice } from '$widgets/stat-bar'

	export let crrMyStat: number | string
	export let needGetStat: number | string
	export let resultStat: number | string
	export let isPercentType: boolean
	export let willNeedMoneyTotal: number

	$: values = [
		{
			title: { kr: '현재 내 능력치', en: 'Current Stats' },
			value: crrMyStat,
			afterMark: '+'
		},
		{
			title: { kr: '얻어야하는 능력치', en: 'Required Stats' },
			value: needGetStat,
			afterMark: '='
		},
		{
			title: { kr: '최종 능력치', en: 'Final Stats' },
			value: resultStat
		}
	]

	$: resultUnit = isPercentType ? '%' : ''
</script>

<section
	class={cn(
		'fixed z-toast overflow-hidden text-center',
		'h-[var(--result-h)] w-[var(--result-w)]',
		'bottom-[var(--result-b)] left-[var(--result-l)]',
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
						<span class="text-sub-lg text-gray-11 land:text-sub-md">
							{value.title[$lang]}
						</span>
						<span class="text-sub-md font-bold text-point land:text-body-lg">
							{value.value}{resultUnit}
						</span>
					</span>
					{#if value.afterMark}
						<span>{value.afterMark}</span>
					{/if}
				{/each}
			</p>
		</div>
		<p class="flex-center w-full bg-background p-1 land:w-[40%] land:p-4">
			<StatBarTotalPrice totalPrice={willNeedMoneyTotal} />
		</p>
	</div>
</section>
