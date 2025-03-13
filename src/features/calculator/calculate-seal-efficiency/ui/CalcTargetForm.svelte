<script lang="ts">
	import {
		myStats,
		STATS,
		STATS_PERCENT_TYPE,
		type StatType
	} from '$entities/seals'
	import {
		calc,
		statColorStyles
	} from '$features/calculator/calculate-seal-efficiency'
	import { Button } from '$shared/button'
	import { ALERT } from '$shared/config'
	import { Input } from '$shared/form'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import { createEventDispatcher, onMount } from 'svelte'
	import { _ } from 'svelte-i18n'

	let value: number | null = null
	let goalStatInput: HTMLInputElement
	$: isKr = $lang === 'kr'

	const dispatch = createEventDispatcher()

	const onClickStatType = (statType: StatType) => {
		calc.selectStatType(statType)
		calc.reset()
		calc.setGoalStat(null)
		value = null
		goalStatInput.focus()
	}

	$: onsubmit = () => {
		if (value === null) {
			alert(ALERT.INPUT_TARGET_VALUE[$lang])
			goalStatInput.focus()
			return
		}
		if (value <= $myStats[$calc.statTypeSelected]) {
			alert(ALERT.WRONG_TARGET_VALUE[$lang])
			return
		}
		dispatch('submit', value)
	}

	onMount(() => {
		goalStatInput.focus()
	})
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
		on:submit|preventDefault={onsubmit}
		class="flex items-center gap-1.5 port:w-full land:w-[30%] land:shrink-0"
	>
		<Input
			bind:inputElement={goalStatInput}
			type="number"
			class="flex-1"
			placeholder={$_('seal.target_value') +
				(STATS_PERCENT_TYPE.includes($calc.statTypeSelected) ? ` (%)` : '')}
			bind:value
		/>
		<Button variant="blue" size="lg" class="font-semibold">
			{$_('seal.view_result')}
		</Button>
	</form>
</div>
