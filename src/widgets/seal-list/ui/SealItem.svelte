<script lang="ts">
	import { page } from '$app/stores'
	import { getSealPrice, type SealData } from '$entities/seals'
	import { _objKeys, cn, timeElapsedString } from '$shared/lib'
	import { lang } from '$shared/model'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { Tooltip } from '$shared/tooltip'
	import { statColorStyles } from '$widgets/my-seals'
	import {
		getMySealStat,
		SEAL_COUNT_STEPS_BY_MASTER,
		SEAL_EXCEPTION_PERCENT
	} from '$widgets/seal-calculator'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'
	import { _ } from 'svelte-i18n'
	import SealItemCount from './SealItemCount.svelte'
	import SealItemPrice from './SealItemPrice.svelte'

	export let seal: SealData
	export let myStep: SealEfficiency['myStep'] = undefined
	export let isCountEditable: boolean = true
	export let isPriceEditable: boolean = true

	let sealPrices = $page.data.sealPrices
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

<article
	class={cn(
		'relative flex flex-col justify-center text-center text-xs2 md:text-xs'
	)}
>
	<div
		class={cn(
			'group relative flex items-center justify-center',
			'h-[3.2em] w-auto md:h-[3.6em]',
			'gradient-black-op border-b border-t border-b-white/30 border-t-white/30 px-1',
			'text-balance break-keep'
		)}
	>
		<h2
			class="{statColorStyles[
				seal.statType
			]} flex items-start font-semibold leading-4"
		>
			{$lang === 'kr' ? seal.name : seal.engName}
		</h2>
		<p class="absolute left-[3px] top-0 text-xs4 text-gray-600 md:text-xs3">
			#{seal.id}
		</p>
		<Tooltip size="sm" useAdaptiveX={true} class="top-4">
			<dl class="flex flex-col gap-1 whitespace-nowrap">
				{#each data as infoItem (infoItem.name)}
					{#if infoItem.value}
						<div class="flex items-center gap-2">
							<dt class="text-gray-300">
								<TextByLang data={infoItem} />
							</dt>
							<dd class="text-point">{infoItem.value}</dd>
						</div>
					{/if}
				{/each}
				{#if myStep}
					<div class="rounded-sm bg-white/10 p-1">
						<p class="mb-1 text-xs3">
							<TextByLang text="현재 내 능력치" engText="Current My Level" />
						</p>
						<ol class="flex items-center gap-1 text-xs3 leading-none">
							{#each SEAL_COUNT_STEPS_BY_MASTER[`${seal.masterCount}`] as sealCount}
								<li
									class={cn(
										myStep.sealCount === sealCount
											? 'rounded-md bg-primary-30 p-1'
											: 'text-gray-400'
									)}
								>
									{sealCount}
								</li>
							{/each}
						</ol>
						<span class="text-gray-300">
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
	</div>
	<div class="flex flex-col items-center gap-1 p-1">
		<SealItemCount sealId={seal.id} isEditable={isCountEditable} />
		<SealItemPrice sealId={seal.id} isEditable={isPriceEditable} />
		<slot></slot>
	</div>
</article>
