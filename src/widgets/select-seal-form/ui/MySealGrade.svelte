<script lang="ts">
	import { page } from '$app/stores'
	import { type MySeal } from '$entities/seals'
	import { getCurrentStep } from '$widgets/seal-calculator'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'

	export let mySeal: MySeal
	$: sealData = getMySealData($page.data.seals, mySeal.id)
	$: crrStep = getCurrentStep(sealData, mySeal.count)
	$: grade = crrStep.grade
	$: result = sealData.maxIncrease * (crrStep?.percent / 100)
	$: calcNum = sealData.statType === 'CT' ? 100 : 1
	$: dataUnit = sealData.statType === 'CT' ? '%' : ''

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
			gradeBgStyles[grade]} text-[9px] md:text-[10px]"
		title="등급">{grade}</span
	>
	<span
		class="font-extrabold {grade &&
			gradeTextStyles[
				grade
			]} py-0.5 text-[11px] brightness-150 saturate-200 md:text-xs"
		>+{result / calcNum}{dataUnit}</span
	>
</p>
