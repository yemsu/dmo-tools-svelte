<script lang="ts">
	import { STATS, STATS_PERCENT_TYPE, type StatType } from '$entities/seals'
	import { calc, statColorStyles } from '$features/calculate-seal-efficiency'
	import { Button } from '$shared/button'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import { createEventDispatcher } from 'svelte'
	import { _ } from 'svelte-i18n'

	let goalStat: number | null = $calc.goalStat
	let goalStatInput: HTMLInputElement
	$: isKr = $lang === 'kr'

	const dispatch = createEventDispatcher<{ submit: number | null }>()

	const onClickStatType = (statType: StatType) => {
		calc.selectStatType(statType)
		calc.reset()
		setTimeout(() => {
			goalStat = null
			goalStatInput.focus()
		}, 60)
	}
</script>

<div class={cn('flex shrink-0 gap-1.5 port:flex-col')}>
	<Tabs class="w-full">
		{#each STATS as stat (stat.type)}
			<Tab
				class={statColorStyles[stat.type]}
				isActive={$calc.statTypeSelected === stat.type}
				on:click={() => onClickStatType(stat.type)}
				title={isKr ? stat.name : stat.engName}
			>
				{stat.type}
			</Tab>
		{/each}
	</Tabs>
	<form
		on:submit|preventDefault={() => dispatch('submit', goalStat)}
		class="flex items-center gap-1.5 port:w-full land:w-[30%] land:shrink-0"
	>
		<Input
			bind:inputElement={goalStatInput}
			type="number"
			class="flex-1"
			placeholder={$_('seal.target_value') +
				(STATS_PERCENT_TYPE.includes($calc.statTypeSelected) ? ` (%)` : '')}
			bind:value={goalStat}
		/>
		<Button variant="blue" size="lg" class="font-semibold">
			{$_('seal.view_result')}
		</Button>
	</form>
</div>
