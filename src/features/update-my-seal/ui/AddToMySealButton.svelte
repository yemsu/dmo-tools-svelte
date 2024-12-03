<script lang="ts">
	import { currentCharacterId } from '$entities/characters'
	import {
		mySealCounts,
		type MySealCount,
		type SealData
	} from '$entities/seals'
	import { Button } from '$shared/button'
	import { CONFIRM, TOAST } from '$shared/config'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import {
		calc,
		type SealEfficiency
	} from '$features/calculate-seal-efficiency'
	import { _ } from 'svelte-i18n'

	export let effData: SealEfficiency
	export let seal: SealData
	export let updateResult: () => void
	$: crrCalcResults = $calc.calcResults[$calc.calcMode][$calc.viewMode]

	$: getHasSameSealPrevStep = (effData: SealEfficiency) => {
		const result = crrCalcResults.some(
			(resultEff) =>
				resultEff.id === effData.id &&
				resultEff.nextStepIdx < effData.nextStepIdx
		)
		return result
	}
	$: hasSameSealPrevStep = getHasSameSealPrevStep(effData)

	const getMySealCount = (mySeal: MySealCount[], sealId: number) =>
		mySeal.find(({ id }) => id === sealId)?.count || 0

	const addToMySeal = (effData: SealEfficiency, seal: SealData) => {
		const mySealCount = getMySealCount($mySealCounts, seal.id)
		const isConfirmed = confirm(
			CONFIRM.ADD_MY_SEAL(seal, effData.needCount)[$lang]
		)
		if (!isConfirmed) return
		if (!$currentCharacterId) {
			alert('no currentCharacterId')
			return
		}
		mySealCounts.updateCount(
			$currentCharacterId,
			{
				id: effData.id,
				count: +mySealCount + effData.needCount
			},
			$lang
		)
		updateResult()
		toast.on(
			TOAST.SEAL_COUNT_UPDATE(seal, mySealCount + effData.needCount)[$lang]
		)
	}
</script>

<Button
	type="button"
	variant="background"
	size="sm"
	class="w-full"
	on:click={() => addToMySeal(effData, seal)}
	disabled={hasSameSealPrevStep}
>
	{#if hasSameSealPrevStep}
		<span class="text-[0.9em] leading-[1.2]"
			>{effData.nextStepIdx}단계 결과를 먼저 등록해 주세요</span
		>
	{:else}
		<iconify-icon icon="mdi:check" width={15} height={15} />
		{$_('seal.seal_registered')}
	{/if}
</Button>
