<script lang="ts">
	import { getSealPrice, type SealData, sealPrices } from '$entities/seals'
	import { cn, timeElapsedString } from '$shared/lib'
	import { Tooltip } from '$shared/tooltip'
	import {
		SEAL_COUNT_STEPS_BY_MASTER,
		type SealStep
	} from '$widgets/seal-calculator'
	import { statColorStyles } from '$widgets/select-seal-form'
	import SealItemCount from './SealItemCount.svelte'
	import SealItemPrice from './SealItemPrice.svelte'
	export let seal: SealData
	export let myStep: SealStep | undefined = undefined
	export let isCountEditable: boolean = true
	export let isPriceEditable: boolean = true
</script>

<div class={cn('relative flex flex-col justify-center text-center')}>
	<div
		class={cn(
			'group relative flex items-center justify-center',
			'h-[3.2em] w-auto md:h-[3.6em]',
			'gradient-black-op border-b border-t border-b-white/30 border-t-white/30 px-1',
			'text-balance break-keep'
		)}
	>
		<p
			class="{statColorStyles[
				seal.statType
			]} flex items-start font-bold leading-4"
		>
			{seal.name}
		</p>
		<p
			class="absolute left-[3px] top-0 text-[8px] text-gray-600 md:text-[10px]"
		>
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
				<div class="flex items-center gap-2">
					<dt class="text-gray-300">가격 업데이트</dt>
					<dd class="text-point">
						{$sealPrices.length > 0 &&
							timeElapsedString(getSealPrice($sealPrices, seal.id).modifiedAt)}
					</dd>
				</div>
				{#if myStep}
					<div class="rounded-sm bg-white/10 p-1">
						<p class="mb-1 text-[10px]">현재 내 능력치</p>
						<ol class="flex items-center gap-1 text-[10px] leading-none">
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
						<span class="font-bold text-point">
							+{myStep ? seal.maxIncrease * (myStep?.percent / 100) : 0}
						</span>
					</div>
				{/if}
			</dl>
		</Tooltip>
	</div>
	<div class="flex flex-col items-center gap-1 p-1">
		<SealItemCount sealId={seal.id} {myStep} isEditable={isCountEditable} />
		<SealItemPrice sealId={seal.id} isEditable={isPriceEditable} />
		<slot></slot>
	</div>
</div>
