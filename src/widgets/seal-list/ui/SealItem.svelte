<script lang="ts">
	import SealItemPrice from './SealItemPrice.svelte'
	import SealItemCount from './SealItemCount.svelte'
	import type { SealData } from '$entities/seals'
	import { type StatType } from '$widgets/select-seal-form/config'
	const statColorStyles: Record<StatType, string> = {
		AT: 'text-stat-at',
		HT: 'text-stat-ht',
		CT: 'text-stat-ct'
	}
	export let seal: SealData
</script>

<span
	class="group relative flex flex-col justify-center bg-primary-10 text-center"
>
	<span
		class="relative flex h-[4em] items-center justify-center text-balance break-keep border-b border-t border-b-white/30 border-t-white/30 bg-black/40 font-bold"
	>
		<span class="{statColorStyles[seal.statType]} flex items-start">
			{seal.name}
		</span>
		<span class="absolute left-[3px] top-0 text-[10px] text-gray-600"
			>#{seal.id}</span
		>
	</span>
	<span class="flex flex-col gap-1 p-1">
		<SealItemCount sealId={seal.id} />
		<SealItemPrice sealId={seal.id} />
	</span>
	<span
		class="absolute -right-1 top-2 z-10 hidden translate-x-full rounded-md bg-primary-90/90 p-2 text-xs font-bold text-black group-hover:block"
	>
		<span>MAX {seal.maxIncrease}</span>
	</span>
</span>
