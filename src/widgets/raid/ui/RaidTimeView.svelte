<script lang="ts">
	import type { GameChannel, RaidData } from '$entities/raid'
	import { Title } from '$shared/text'
	import RaidLocation from '$widgets/raid-bar/ui/RaidLocation.svelte'
	import AddTime from '$widgets/raid/ui/AddTime.svelte'
	import RaidTimeList from '$widgets/raid/ui/RaidTimeList.svelte'

	export let raid: RaidData
	$: raidChannels = raid.channels
		.split(',')
		.map((channel) => +channel) as GameChannel[]
</script>

<section
	class="scroll-box size-full rounded-md py-2 pl-2 backdrop-blur-sm md:pl-4"
>
	<div class="mb-4 flex flex-col items-center gap-2 md:flex-row md:gap-3">
		<Title class="text-center">{raid.name}</Title>
		<RaidLocation location={raid.location} size="md" />
	</div>
	<RaidTimeList {raid} {raidChannels} />
	<AddTime {raid} {raidChannels} />
</section>
