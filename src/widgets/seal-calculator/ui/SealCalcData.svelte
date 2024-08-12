<script lang="ts">
	import { numberFormatter } from '$shared/lib'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'

	export let effData: SealEfficiency
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

<div class="flex-col-center w-full rounded-sm bg-white/10 p-2">
	<dl class="flex flex-col gap-1 whitespace-nowrap leading-none">
		{#each datalist as data (data.key)}
			<div class="flex items-center gap-1">
				<dt class="text-[11px] text-gray-200">{data.text}</dt>
				<dd class="text-point">
					{numberFormatter(effData[data.key], 5)}
				</dd>
			</div>
		{/each}
	</dl>
</div>
