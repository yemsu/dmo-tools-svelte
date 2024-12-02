<script lang="ts">
	import { STATS_PERCENT_TYPE, type StatType } from '$entities/seals'
	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { createEventDispatcher } from 'svelte'
	import { _ } from 'svelte-i18n'

	export let statTypeSelected: StatType
	let goalStat: number | '' = ''
	let goalStatInput: HTMLInputElement
	const dispatch = createEventDispatcher<{ submit: number | '' }>()
</script>

<form
	on:submit|preventDefault={() => dispatch('submit', goalStat)}
	class="flex items-center gap-1.5 port:w-full land:w-[30%] land:shrink-0"
>
	<Input
		bind:inputElement={goalStatInput}
		type="number"
		class="flex-1"
		placeholder={$_('seal.target_value') +
			(STATS_PERCENT_TYPE.includes(statTypeSelected) ? ` (%)` : '')}
		bind:value={goalStat}
	/>
	<Button variant="blue" size="lg" class="font-semibold">
		{$_('seal.view_result')}
	</Button>
</form>
