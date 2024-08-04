<script lang="ts">
	import type { MySeal, SealData } from '$entities/seals'
	import {
		statColorStyles,
		type StatType
	} from '$widgets/select-seal-form/config'

	export let seal: SealData | MySeal
	export let count: number | undefined = undefined
</script>

<span class="flex flex-col justify-center bg-primary-50 text-center">
	<span
		class="flex h-[4em] items-center justify-center text-balance break-keep border-b border-t border-b-white/30 border-t-white/30 bg-black/40 font-bold"
	>
		<span class="{statColorStyles[seal.statType]} flex items-start">
			{seal.name}
		</span>
	</span>
	<span class="flex flex-col gap-1 p-1">
		<span>
			<span>MAX {seal.maxIncrease}</span>
		</span>
		{#if count !== undefined}
			<span>{count}개</span>
		{/if}
	</span>
</span>
