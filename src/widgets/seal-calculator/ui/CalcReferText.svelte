<script lang="ts">
	import { type StatType } from '$entities/seals'
	import { Icon } from '$shared/icon'
	import { ListReferText } from '$shared/list'
	import { TextByLang } from '$shared/text'
	import { type SealEfficiency } from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'

	export let statTypeSelected: StatType
	export let goalStat: number | ''
	export let calcResultList: SealEfficiency[]
</script>

<ListReferText tagName="h2" mb={false} class="flex items-center">
	{statTypeSelected}
	{#if goalStat}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		{$_('seal.target_stat')}: {goalStat}
	{:else}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		<span class="text-gray-10">
			<TextByLang
				text="목표 수치를 입력해주세요"
				engText="Please enter target values"
			/>
		</span>
	{/if}
	{#if calcResultList.length}
		<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
		{$_('seal.result_count')}: {calcResultList.length}
	{/if}
</ListReferText>
