<script lang="ts">
	import { getSealPrice, type SealData, sealPrices } from '$entities/seals'
	import { cn, timeElapsedString } from '$shared/lib'
	import { Tooltip } from '$shared/tooltip'
	import { statColorStyles } from '$widgets/select-seal-form'
	import SealItemCount from './SealItemCount.svelte'
	import SealItemPrice from './SealItemPrice.svelte'
	export let seal: SealData
	export let isCountEditable: boolean = true
</script>

<div class={cn('group relative flex flex-col justify-center text-center')}>
	<div
		class={cn(
			'relative flex items-center justify-center',
			'h-[3.6em] w-auto',
			'gradient-black-op border-b border-t border-b-white/30 border-t-white/30 px-1',
			'text-balance break-keep font-bold'
		)}
	>
		<p class="{statColorStyles[seal.statType]} flex items-start leading-4">
			{seal.name}
		</p>
		<p
			class="absolute left-[3px] top-0 text-[9px] text-gray-600 md:text-[10px]"
		>
			#{seal.id}
		</p>
	</div>
	<div class="flex flex-col items-center gap-1 p-1">
		<SealItemCount sealId={seal.id} {isCountEditable} />
		<SealItemPrice sealId={seal.id} />
		<slot></slot>
	</div>
	<Tooltip size="sm" useAdaptiveX={true}>
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
		</dl>
	</Tooltip>
</div>
