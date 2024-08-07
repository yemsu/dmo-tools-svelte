<script lang="ts">
	import SealItemPrice from './SealItemPrice.svelte'
	import SealItemCount from './SealItemCount.svelte'
	import type { SealData } from '$entities/seals'
	import { type StatType } from '$widgets/select-seal-form/config'
	import { cn } from '$shared/lib'
	const statColorStyles: Record<StatType, string> = {
		AT: 'text-stat-at',
		HT: 'text-stat-ht',
		CT: 'text-stat-ct'
	}
	export let seal: SealData
	export let isCountEditable: boolean = true
</script>

<div class={cn('group relative flex flex-col justify-center text-center ')}>
	<div
		class={cn(
			'relative flex items-center justify-center',
			'h-[4em] w-auto px-0 py-1',
			'border-b border-t border-b-white/30 border-t-white/30 bg-black/40',
			'text-balance break-keep font-bold'
		)}
	>
		<p class="{statColorStyles[seal.statType]} flex items-start">
			{seal.name}
		</p>
		<p
			class="absolute right-[3px] top-0 text-[9px] text-gray-600 md:left-[3px] md:right-auto md:text-[10px]"
		>
			#{seal.id}
		</p>
	</div>
	<div class="flex flex-col items-center gap-1 p-1">
		<SealItemCount sealId={seal.id} {isCountEditable} />
		<SealItemPrice sealId={seal.id} />
		<slot></slot>
	</div>
	<div
		class="absolute -right-1 top-2 z-10 hidden translate-x-full rounded-md bg-primary-90/90 p-2 text-xs font-bold text-black group-hover:block"
	>
		<p>MAX {seal.maxIncrease}</p>
	</div>
</div>
