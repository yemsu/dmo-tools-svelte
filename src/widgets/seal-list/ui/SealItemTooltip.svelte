<script lang="ts">
	import { getSealPrice, type SealData, type SealPrice } from '$entities/seals'
	import { _objKeys, cn, timeElapsedString } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { Tooltip } from '$shared/tooltip'
	import {
		getMySealStat,
		SEAL_COUNT_STEPS_BY_MASTER,
		SEAL_EXCEPTION_PERCENT,
		type SealEfficiency
	} from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'

	export let seal: SealData
	export let sealPrices: SealPrice[]
	export let myStep: SealEfficiency['myStep'] = undefined

	$: sealPrice = getSealPrice(sealPrices, seal.id)
	$: timeElapsed =
		sealPrice && sealPrices.length > 0
			? timeElapsedString(sealPrice.modifiedAt)
			: undefined

	$: data = [
		{
			name: '최대 스탯',
			engName: 'Max Stat',
			value: seal.maxIncrease.toLocaleString()
		},
		{
			name: '마스터 개수',
			engName: 'Master Count',
			value: seal.masterCount.toLocaleString()
		},
		{
			name: '가격 업데이트',
			engName: 'Price Updated',
			value:
				timeElapsed &&
				`${timeElapsed.value || ''} ${$_(timeElapsed.timeUnit)}${$lang === 'en' && timeElapsed.value && timeElapsed.value > 1 ? 's' : ''} ${$_('ago')}`
		}
	]
</script>

<Tooltip size="sm" useAdaptiveX={true} class="top-4">
	<dl class="flex flex-col gap-1 whitespace-nowrap">
		{#each data as infoItem (infoItem.name)}
			{#if infoItem.value}
				<div class="flex items-center gap-2">
					<dt class="text-gray-11">
						<TextByLang data={infoItem} />
					</dt>
					<dd class="text-point">{infoItem.value}</dd>
				</div>
			{/if}
		{/each}
		{#if myStep}
			<div class="rounded-sm bg-white/10 p-1">
				<p class="mb-1 text-body-sm">
					<TextByLang text="현재 내 능력치" engText="Current My Level" />
				</p>
				<ol class="flex items-center gap-1 text-body-sm leading-none">
					{#each SEAL_COUNT_STEPS_BY_MASTER[`${seal.masterCount}`] as sealCount}
						<li
							class={cn(
								myStep.sealCount === sealCount
									? 'rounded-md bg-blue-6 p-1'
									: 'text-gray-9'
							)}
						>
							{sealCount}
						</li>
					{/each}
				</ol>
				<span class="text-gray-11">
					{#if !_objKeys(SEAL_EXCEPTION_PERCENT).includes(`${seal.id}`)}
						{seal.maxIncrease} * {myStep?.percent}% =
					{/if}
				</span>
				<span class="font-semibold text-point">
					+{getMySealStat(seal, myStep.percent)}
				</span>
			</div>
		{/if}
	</dl>
</Tooltip>
