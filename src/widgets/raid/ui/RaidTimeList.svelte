<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import AddTime from '$widgets/raid/ui/AddTime.svelte'

	export let raid: RaidData
	const getTime = (time: string) => {
		const date = new Date(time)
		return date.toLocaleTimeString('en-US')
	}
</script>

<div>
	<AddTime {raid} />
	{#if raid.times}
		{#each raid.times as time (time.id)}
			<dl class="grid grid-cols-5">
				<div class="col-span-2">
					<dt class="text-[10px] text-gray-300">시작 시간</dt>
					<dd class="text-xs">{getTime(time.startAt)}</dd>
				</div>
				<div>
					<dt class="text-[10px] text-gray-300">채널</dt>
					<dd class="text-center text-xs">{time.channel}</dd>
				</div>
				<div>
					<dt class="text-[10px] text-gray-300">투표수</dt>
					<dd class="text-center text-xs">{time.voteCount}</dd>
				</div>
			</dl>
		{/each}
	{/if}
</div>
