<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { STATS_PERCENT_TYPE, type MySealCount } from '$entities/seals'
	import { getMySealData } from '$widgets/my-seals/lib/helper'
	import { getCurrentStep, getMySealStat } from '$widgets/seal-calculator'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	export let mySeal: MySealCount
	$: sealData = getMySealData($page.data.seals, mySeal.id)
	$: crrStep = getCurrentStep(sealData, mySeal.count)
	$: grade = crrStep.grade
	$: result = getMySealStat(sealData, crrStep.percent)
	$: isPercentType = STATS_PERCENT_TYPE.includes(sealData.statType)
	$: calcNum = isPercentType ? 100 : 1
	$: dataUnit = isPercentType ? '%' : ''

	const gradeBgStyles = {
		노말: 'bg-[#0C73AE]',
		브론즈: 'bg-[#0C73AE]',
		실버: 'bg-[#7D7B7B]',
		골드: 'bg-[#A3712C]',
		플래티넘: 'bg-[#2B57FF]',
		마스터: 'bg-[#754ED1]'
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

<p class="mt-1 rounded-full bg-black/90 pr-2">
	<span
		class="rounded-full px-1 py-0.5 md:px-2 {grade &&
			gradeBgStyles[grade.name]} text-xs4 md:text-xs3"
		title={$_('grade')}
	>
		<TextByLang data={grade} />
	</span>
	<span
		class="font-bold {grade &&
			gradeTextStyles[
				grade.name
			]} py-0.5 text-xs2 brightness-150 saturate-200 md:text-xs"
		>+{result / calcNum}{dataUnit}</span
	>
</p>
