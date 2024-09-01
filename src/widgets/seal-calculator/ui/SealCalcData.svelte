<script lang="ts">
	import { numberFormatter } from '$shared/lib'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'

	export let effData: SealEfficiency
	export let isPercentType: boolean
	const datalist: {
		key: keyof Omit<SealEfficiency, 'myStep'>
		text: string
		title?: string
	}[] = [
		{ key: 'needCount', text: '필요개수' },
		{ key: 'needPrice', text: '필요금액' },
		{ key: 'willGetStat', text: '획득능력치' },
		{ key: 'efficiency', text: '효율', title: '1M당 얻게되는 능력치' }
	]
</script>

<div class="flex-col-center w-full rounded-sm bg-white/10 p-1 md:p-2">
	<dl class="flex flex-col gap-1 whitespace-nowrap leading-none">
		{#each datalist as data (data.key)}
			<div class="flex items-center gap-1">
				<dt class="text-xs2 text-gray-200 sm:text-xs3">{data.text}</dt>
				<dd class="text-point sm:text-xs2">
					{#if data.key === 'willGetStat' && isPercentType}
						{effData[data.key] / 100}%
					{:else}
						{numberFormatter(effData[data.key], 5)}
					{/if}
				</dd>
			</div>
		{/each}
	</dl>
</div>
