<script lang="ts">
	import { cn } from '$shared/lib'
	import { Time, type TimeUnit } from '$shared/time'
	import RaidBarServerButton from './RaidBarServerButton.svelte'

	let time: Record<TimeUnit, number> = {
		h: 1,
		m: 30,
		s: 20
	}
</script>

<div
	class={cn(
		'h-raid-bar-h flex items-center',
		'border border-primary-50 bg-primary-5/80',
		'text-[11px] leading-none',
		'whitespace-nowrap rounded-md drop-shadow-md'
	)}
>
	<RaidBarServerButton />
	<button
		class={cn('flex-center relative gap-1', 'h-full flex-1 px-2')}
		title="레이드 정보 자세히 보기"
		on:click
	>
		<span class="rounded-full bg-primary-30 px-2 py-0.5 text-[10px]">
			베르단디 터미널
		</span>
		<span>
			<span>
				<iconify-icon
					icon="mdi:dinosaur-pixel"
					width={13}
					height={13}
					class="-mb-[2px]"
				/>
				데스크돌그레몬(초거대)
			</span>
			<Time {time} />
		</span>
	</button>
</div>
