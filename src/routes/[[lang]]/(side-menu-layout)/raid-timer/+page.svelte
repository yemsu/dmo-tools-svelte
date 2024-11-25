<script lang="ts">
	import { goto } from '$app/navigation'
	import { raids, type RaidData } from '$entities/raid'
	import {
		BeepToggleButton,
		ControlWindowAlarmButton,
		RaidServerTabs
	} from '$features/control-raid-timer-option'
	import { META } from '$shared/config'
	import { cn, isLandscape } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { lang } from '$shared/model'
	import { PageHeader } from '$shared/ui/page-header'
	import { RaidSearchInput, RaidTabList, RaidTimeView } from '$widgets/raid'

	let searchValue = ''
	let selectedRaid: RaidData | undefined
	$: raidList = $raids

	const setRaidList = (_raids: RaidData[]) => {
		raidList = _raids
	}

	const selectRaid = (_raid: RaidData) => {
		selectedRaid = _raid
	}

	const gotoErrorPage = () => {
		if (import.meta.env.SSR || $lang !== 'en') return
		goto(`/en`)
	}

	$: $lang && gotoErrorPage()
</script>

<svelte:head>
	<title>{META.RAID_TIMER.TITLE[$lang]}</title>
	<meta name="description" content={META.RAID_TIMER.DESC[$lang]} />
</svelte:head>

<section class="flex flex-col">
	<PageHeader title={{ kr: '레이드 타이머', en: ' Raid Timer' }} mb={false}>
		<div slot="nextTitleSlot">
			{#if $isLandscape === true}
				<RaidSearchInput bind:value={searchValue} {setRaidList} />
			{/if}
		</div>
		<div class="flex gap-2">
			<RaidServerTabs />
			<ControlWindowAlarmButton />
			<BeepToggleButton />
		</div>
	</PageHeader>
	{#if $isLandscape === false}
		<RaidSearchInput
			slot="nextTitleSlot"
			bind:value={searchValue}
			class="mb-2"
			{setRaidList}
		/>
	{/if}
	<ListReferText tagName="p" class="flex items-center">
		{searchValue ? `"${searchValue}"` : '전체'} ({raidList.length}개)
	</ListReferText>

	<div class="gap-2 land:gap-4">
		<div class="inline-block w-[45%] max-w-[500px] land:w-[50%]">
			<RaidTabList {raidList} {selectRaid} {selectedRaid} {searchValue} />
		</div>
		{#if selectedRaid}
			<div
				id="raid-panel-{selectedRaid.id}"
				role="tabpanel"
				aria-labelledby="raid-tab-{selectedRaid.id}"
				class={cn(
					'sticky top-[calc(var(--header-h)+var(--raid-bar-h))] float-right inline-block w-[53%] shrink-0 land:top-0 land:w-[48%]'
				)}
			>
				<RaidTimeView raid={selectedRaid} />
			</div>
		{/if}
	</div>
</section>
