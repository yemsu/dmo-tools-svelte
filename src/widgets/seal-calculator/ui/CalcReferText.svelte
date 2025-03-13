<script lang="ts">
	import { calc } from '$features/calculator/calculate-seal-efficiency'
	import { Icon } from '$shared/icon'
	import { ListReferText } from '$shared/list'
	import { TextByLang } from '$shared/text'
	import { _ } from 'svelte-i18n'

	$: crrCalcResults = $calc.calcResults[$calc.viewMode]
</script>

<ListReferText tagName="h2" mb={false} class="flex items-center">
	{$calc.statTypeSelected}
	{#if $calc.goalStat}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		{$_('seal.target_value')}: {$calc.goalStat}
	{:else}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		<span class="text-gray-10">
			<TextByLang
				text="목표 수치를 입력해주세요"
				engText="Please enter target values"
			/>
		</span>
	{/if}
	{#if crrCalcResults.length}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		{$_('seal.result_count')}: {crrCalcResults.length}
	{/if}
</ListReferText>
