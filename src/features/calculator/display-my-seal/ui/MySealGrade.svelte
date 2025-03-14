<script lang="ts">
	import {
		STATS_PERCENT_TYPE,
		type MySealCount,
		type SealData
	} from '$entities/seals'
	import {
		getCurrentStep,
		getMySealStat
	} from '$features/calculator/calculate-seal-efficiency'
	import { getMySealData } from '$features/calculator/update-my-seal'
	import { cn } from '$shared/lib'
	import { TextByLang } from '$shared/text'

	export let seals: SealData[]
	export let mySeal: MySealCount
	$: sealData = getMySealData(seals, mySeal.id)
	$: crrStep = getCurrentStep(sealData, mySeal.count)
	$: grade = crrStep.grade
	$: result = getMySealStat(sealData, crrStep.percent)
	$: isPercentType = STATS_PERCENT_TYPE.includes(sealData.statType)
	$: calcNum = isPercentType ? 100 : 1
	$: dataUnit = isPercentType ? '%' : ''

	const gradeBgStyles = {
		노말: 'bg-[#0C73AE22]',
		브론즈: 'bg-[#0C73AE22]',
		실버: 'bg-[#7D7B7B22]',
		골드: 'bg-[#A3712C22]',
		플래티넘: 'bg-[#2B57FF22]',
		마스터: 'bg-[#754ED122]'
	}
	const gradeTextStyles = {
		노말: 'text-[#0C73AE]',
		브론즈: 'text-[#0C73AE]',
		실버: 'text-[#7D7B7B]',
		골드: 'text-[#A3712C]',
		플래티넘: 'text-[#2B57FF]',
		마스터: 'text-[#754ED1]'
	}
</script>

<p
	class={cn(
		'rounded-b-md bg-background/50 py-1 text-sub-lg font-semibold leading-none dark:font-bold',
		'-m-1 mt-0 w-[calc(100%+8px)] land:-m-2 land:mt-0 land:w-[calc(100%+16px)]',
		grade && gradeTextStyles[grade.name],
		grade && gradeBgStyles[grade.name]
	)}
>
	<span class="flex-center gap-1 dark:brightness-150 dark:saturate-200">
		<span class={cn('h-[0.3em] w-[0.3em] rotate-45 bg-current')}></span>
		<TextByLang data={grade} />
		+{result / calcNum}{dataUnit}
	</span>
</p>
