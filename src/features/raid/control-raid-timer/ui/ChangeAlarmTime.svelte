<script lang="ts">
	import { alarmMinute } from '$entities/raid'
	import { Button } from '$shared/button'
	import { Dropdown } from '$shared/dropdown'
	import { Icon } from '$shared/icon'
	import { cn } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
</script>

<Dropdown class={cn('h-full', $$restProps.class)} menuBoxAlign="center">
	<Button
		size="icon-md"
		variant="outline"
		slot="buttonSlot"
		let:toggleDropdown
		on:click={toggleDropdown}
		title="알림 타이머 설정"
	>
		<span class="relative">
			<Icon icon="carbon:timer" size="1.4em" />
			<span
				class="absolute bottom-[-0.01em] right-0 rounded-full bg-background p-[1.5px] text-sub-md font-extrabold leading-none tracking-[-0.1em] text-blue-8"
				>{$alarmMinute}</span
			>
		</span>
	</Button>
	<Tabs slot="contentSlot" let:closeDropdown dir="ver">
		{#each [1, 3, 5, 10] as alarmMinuteOption (alarmMinuteOption)}
			<Tab
				isActive={alarmMinuteOption === $alarmMinute}
				on:click={() => {
					alarmMinute.set(alarmMinuteOption)
					closeDropdown()
				}}
			>
				{alarmMinuteOption}분 전
			</Tab>
		{/each}
	</Tabs>
</Dropdown>
