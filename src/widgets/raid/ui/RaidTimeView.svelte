<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { Title } from '$shared/text'
	import NoData from '$shared/text/ui/NoData.svelte'
	import RaidLocation from '$widgets/raid-bar/ui/RaidLocation.svelte'
	import AddTime from '$widgets/raid/ui/AddTime.svelte'
	import RaidTimeList from '$widgets/raid/ui/RaidTimeList.svelte'

	export let raid: RaidData
</script>

<section class="size-full rounded-md py-2 pl-2 backdrop-blur-sm md:pl-4">
	<div class="mb-4 flex flex-col items-center gap-2 md:flex-row md:gap-3">
		<Title class="text-center">{raid.name}</Title>
		<RaidLocation location={raid.location} size="md" />
	</div>
	{#if raid.times.length > 0}
		<RaidTimeList {raid} />
	{:else}
		<NoData>아직 제보된 보스 출현 정보가 없습니다.</NoData>
	{/if}
	<AddTime {raid} />
</section>
