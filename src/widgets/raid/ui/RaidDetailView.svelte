<script lang="ts">
	import { selectedRaidTab } from '$entities/raid'
	import RaidTimeList from '$widgets/raid/ui/RaidTimeList.svelte'
</script>

{#if $selectedRaidTab}
	<div class="size-full rounded-md bg-primary-5/60 p-3 backdrop-blur-sm">
		{#if $selectedRaidTab.times}
			<RaidTimeList raid={$selectedRaidTab} />
		{/if}
	</div>
{/if}
