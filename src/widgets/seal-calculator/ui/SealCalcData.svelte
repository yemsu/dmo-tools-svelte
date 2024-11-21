<script lang="ts">
	import { numberFormatter } from '$shared/lib'
	import { TextByLang } from '$shared/text'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'

	export let effData: SealEfficiency
	export let isPercentType: boolean
	const datalist: {
		key: keyof Omit<SealEfficiency, 'myStep'>
		name: string
		engName: string
		title?: string
	}[] = [
		{ key: 'needCount', name: '필요개수', engName: 'Qty' },
		{ key: 'needPrice', name: '필요금액', engName: 'Cost' },
		{ key: 'willGetStat', name: '획득능력치', engName: 'Stat Gain' },
		{
			key: 'efficiency',
			name: '효율',
			engName: 'Eff.',
			title: '1M당 얻게되는 능력치'
		}
	]
</script>

<div class="flex-col-center w-full rounded-sm bg-gray-1 p-1 md:p-2">
	<dl class="flex flex-col gap-1 whitespace-nowrap leading-none">
		{#each datalist as data (data.key)}
			<div class="flex items-center gap-1">
				<dt class="text-sub-sm text-gray-10">
					<TextByLang {data} />
				</dt>
				<dd class="text-blue-9 sm:text-sub-md">
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
