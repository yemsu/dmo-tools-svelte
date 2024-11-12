<script lang="ts">
	import { lang } from '$shared/model'
	export let data: Record<string, unknown> | undefined = undefined
	export let dataKey = ['name', 'engName'] as [string, string]
	export let text: string | undefined = undefined
	export let engText: string | undefined = undefined

	$: isKr = $lang === 'kr'
</script>

{#if data}
	{#if isKr}
		{data[dataKey[0]]}
	{:else}
		{data[dataKey[1]]}
	{/if}
{:else if text && engText}
	{#if isKr}
		{text}
	{:else}
		{engText}
	{/if}
{/if}
