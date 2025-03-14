<script lang="ts">
	import type { GameChannel, RaidData } from '$entities/raid'
	import { Title } from '$shared/text'
	import { RaidLocation } from '$features/raid/display-raid-info'
	import RaidTimeList from '$features/raid/display-raid-info/ui/RaidTimeList.svelte'

	export let raid: RaidData
	$: raidChannels = raid.channels
		.split(',')
		.map((channel) => +channel) as GameChannel[]
</script>

<section
	class="flex size-full flex-col gap-4 rounded-md py-6 backdrop-blur-sm port:py-content-side land:gap-5"
>
	<div
		class="flex flex-col flex-wrap gap-2 border-b border-gray-3 pb-4 text-body-lg port:items-center land:flex-row"
	>
		<Title class="port:text-center">{raid.name}</Title>
		<p>
			<RaidLocation location={raid.location} />
		</p>
	</div>
	<div>
		<RaidTimeList {raid} {raidChannels} />
	</div>
</section>
