<script lang="ts">
	import {
		getSealPrice,
		mySealCounts,
		type SealData,
		type SealPrice
	} from '$entities/seals'
	import { _objKeys, cn, timeElapsedString } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { Tooltip } from '$shared/tooltip'
	import {
		getCurrentStep,
		getMySealStat,
		SEAL_COUNT_STEPS_BY_MASTER,
		SEAL_EXCEPTION_PERCENT
	} from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'

	export let seal: SealData
	export let id: string
	export let sealPrices: SealPrice[]
	$: mySealData = $mySealCounts.find(({ id }) => id === seal.id)
	$: myStep = mySealData ? getCurrentStep(seal, mySealData.count) : null

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

<Tooltip {id} size="sm" useAdaptiveX={true} class="top-4">
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
		<div class="flex flex-col gap-0.5 rounded-sm bg-white/10 p-1">
			<p class="text-sub-lg land:text-body-sm">
				<TextByLang text="현재 내 능력치" engText="Current My Level" />
			</p>
			<ol
				class="flex items-center gap-1 text-sub-md leading-none land:text-body-sm"
			>
				{#each SEAL_COUNT_STEPS_BY_MASTER[`${seal.masterCount}`] as sealCount}
					<li
						class={cn(
							myStep?.sealCount === sealCount
								? 'rounded-md bg-blue-6 p-0.5 land:p-1'
								: 'text-gray-9'
						)}
					>
						{sealCount}
					</li>
				{/each}
			</ol>
			<p>
				<span class="text-gray-11">
					{#if !_objKeys(SEAL_EXCEPTION_PERCENT).includes(`${seal.id}`)}
						{seal.maxIncrease} * {myStep?.percent || 0}% =
					{/if}
				</span>
				<span class="font-semibold text-point">
					+{getMySealStat(seal, myStep?.percent || 0)}
				</span>
			</p>
		</div>
	</dl>
</Tooltip>
