<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import {
		RaidLocation,
		RaidAppearInfo,
		RaidInformant,
		RaidNextIcon,
		RaidTitle
	} from '$widgets/raid'
	export let raid: RaidData
	$: nextTime = raid.times[0]
</script>

<span class={cn('flex leading-none md:items-center md:gap-3 sm:flex-col')}>
	<span class={cn('flex flex-col flex-wrap gap-0.5 text-left')}>
		<RaidTitle title={raid.name} />
		<RaidLocation location={raid.location} />
	</span>
	<RaidNextIcon class="sm:hidden" />
	<span
		class={cn(
			'flex shrink-0 items-center gap-1.5',
			'sm:mt-1.5 sm:flex-col sm:items-start sm:border-t sm:border-gray-3 sm:pt-1.5'
		)}
	>
		{#if nextTime}
			<span>
				<RaidAppearInfo time={nextTime} />
			</span>
			<span>
				<RaidInformant user={nextTime.user} size="sm" class="opacity-80" />
			</span>
		{:else}
			<span class="text-sub-md2 md:text-sub-md text-gray-400">제보 없음</span>
		{/if}
	</span>
</span>
