<script lang="ts">
	import { page } from '$app/stores'
	import { getSealPrice, type SealData } from '$entities/seals'
	import { cn, timeElapsedString } from '$shared/lib'
	import { Tooltip } from '$shared/tooltip'
	import { SEAL_COUNT_STEPS_BY_MASTER } from '$widgets/seal-calculator'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'
	import { statColorStyles } from '$widgets/my-seals'
	import SealItemCount from './SealItemCount.svelte'
	import SealItemPrice from './SealItemPrice.svelte'
	export let seal: SealData
	export let myStep: SealEfficiency['myStep'] = undefined
	export let isCountEditable: boolean = true
	export let isPriceEditable: boolean = true
	let sealPrices = $page.data.sealPrices
	$: sealPrice = getSealPrice(sealPrices, seal.id)
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
			{seal.name}
		</h2>
		<p class="absolute left-[3px] top-0 text-xs4 text-gray-600 md:text-xs3">
			#{seal.id}
		</p>
		<Tooltip size="sm" useAdaptiveX={true} class="top-4">
			<dl class="flex flex-col gap-1 whitespace-nowrap">
				<div class="flex items-center gap-2">
					<dt class="text-gray-300">최대 스탯</dt>
					<dd class="text-point">{seal.maxIncrease.toLocaleString()}</dd>
				</div>
				<div class="flex items-center gap-2">
					<dt class="text-gray-300">마스터 개수</dt>
					<dd class="text-point">{seal.masterCount.toLocaleString()}</dd>
				</div>
				{#if sealPrice}
					<div class="flex items-center gap-2">
						<dt class="text-gray-300">가격 업데이트</dt>
						<dd class="text-point">
							{sealPrices.length > 0 && timeElapsedString(sealPrice.modifiedAt)}
						</dd>
					</div>
				{/if}
				{#if myStep}
					<div class="rounded-sm bg-white/10 p-1">
						<p class="mb-1 text-xs3">현재 내 능력치</p>
						<ol class="flex items-center gap-1 text-xs3 leading-none">
							{#each SEAL_COUNT_STEPS_BY_MASTER[seal.masterCount] as sealCount}
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
							{seal.maxIncrease} * {myStep?.percent}% =
						</span>
						<span class="font-semibold text-point">
							+{myStep ? seal.maxIncrease * (myStep?.percent / 100) : 0}
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
