<script lang="ts">
	import { goto } from '$app/navigation'
	import { raids, type RaidData } from '$entities/raid'
	import {
		BeepToggleButton,
		ControlWindowAlarmButton,
		raidOption,
		RaidServerTabs
	} from '$features/control-raid-timer-option'
	import { META } from '$shared/config'
	import { ListReferText } from '$shared/list'
	import { lang } from '$shared/model'
	import { PageHeader } from '$shared/ui/page-header'
	import { RaidSearchInput, RaidTabList, RaidTimeView } from '$widgets/raid'
	import { onMount } from 'svelte'

	let searchValue = ''
	$: raidList = $raids

	const setRaidList = (_raids: RaidData[]) => {
		raidList = _raids
	}

	const gotoErrorPage = () => {
		if (import.meta.env.SSR || $lang !== 'en') return
		goto(`/en`)
	}

	onMount(() => {
		raidOption.loadAllOptions()
	})

	$: $lang && gotoErrorPage()
</script>

<svelte:head>
	<title>{META.RAID_TIMER.TITLE[$lang]}</title>
	<meta name="description" content={META.RAID_TIMER.DESC[$lang]} />
</svelte:head>

<section class="flex flex-col">
	<PageHeader
		title={{ kr: `레이드 타이머`, en: ' Raid Timer' }}
		mb={false}
		class="port:flex-col port:items-start"
	>
		<nav class="flex flex-1 gap-2 port:w-full">
			<h2 class="ir">타이머 조작 메뉴</h2>
			<RaidSearchInput
				bind:value={searchValue}
				{setRaidList}
				class="port:flex-1"
			/>
			<div class="order-1 flex gap-2 land:ml-auto">
				<RaidServerTabs />
				<ControlWindowAlarmButton />
				<BeepToggleButton />
			</div>
		</nav>
	</PageHeader>
	<ListReferText tagName="p" class="flex items-center">
		{searchValue ? `"${searchValue}"` : '전체'} ({raidList.length}개)
	</ListReferText>
	<RaidTabList {raidList} {searchValue} let:raid>
		<RaidTimeView {raid} />
	</RaidTabList>
</section>
