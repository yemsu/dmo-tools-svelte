<script lang="ts">
	import type { Stats } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { STATS } from '$widgets/select-seal-form'

	export let stats: Stats
	export let totalPrice: number

	const convertToTMB = (mPrice: number) => {
		const T = Math.floor(mPrice / 1000)
		const remainingM = mPrice % 1000
		const M = Math.floor(remainingM)
		const B = Math.round((remainingM - M) * 1000)

		return [T, M, B]
	}
	$: [tPrice, mPrice, bPrice] = convertToTMB(totalPrice)
</script>

<div class="rounded-md border border-primary-50 bg-primary-10 p-3">
	<h3 class="ir">내 능력치</h3>
	<dl>
		<div class="flex flex-wrap items-center justify-center gap-4">
			{#each STATS as stat (stat.type)}
				<div class="sm:text-md flex items-center gap-2 rounded-full text-sm">
					<dt class="text-xs text-gray-200">{stat.type}</dt>
					<dd class="font-bold text-point">
						{stats[stat.type].toLocaleString()}
					</dd>
				</div>
			{/each}
		</div>
		<div
			class="mt-4 flex items-center justify-center gap-2 border-t border-t-primary-90/30 pt-2 text-center"
		>
			<dt class="text-xs text-gray-200">등록된 씰의 총 가격</dt>
			<dd class="flex items-center gap-2 text-sm font-bold">
				<span class="flex items-center gap-1">
					<span
						class={cn(
							'h-[16px] w-[16px] text-xs leading-none',
							'bg-price-t-2 text-price-t-1 border-price-t-1 border'
						)}>T</span
					>
					<span>{tPrice}</span>
				</span>
				<span class="flex items-center gap-1">
					<span
						class={cn(
							'h-[16px] w-[16px] text-xs leading-none',
							'bg-price-m-2 text-price-m-1 border-price-m-1 border'
						)}>M</span
					>
					<span>{mPrice}</span>
				</span>
				<span class="flex items-center gap-1">
					<span
						class={cn(
							'h-[16px] w-[16px] text-xs leading-none',
							'bg-price-b-2 text-price-b-1 border-price-b-1 border'
						)}>B</span
					>
					<span>{bPrice}</span>
				</span>
			</dd>
		</div>
	</dl>
</div>
