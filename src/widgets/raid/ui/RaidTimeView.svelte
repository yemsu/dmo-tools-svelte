<script lang="ts">
	import type { GameChannel, RaidData } from '$entities/raid'
	import { Title } from '$shared/text'
	import { RaidLocation } from '$widgets/raid'
	import RaidTimeList from '$widgets/raid/ui/RaidTimeList.svelte'

	export let raid: RaidData
	$: raidChannels = raid.channels
		.split(',')
		.map((channel) => +channel) as GameChannel[]
</script>

<section class="scroll-box size-full rounded-md py-6 backdrop-blur-sm">
	<div
		class="mb-4 flex flex-col flex-wrap gap-2 port:items-center land:flex-row land:gap-3"
	>
		<Title class="port:text-center">{raid.name}</Title>
		<RaidLocation location={raid.location} />
	</div>
	<RaidTimeList {raid} {raidChannels} />
</section>
