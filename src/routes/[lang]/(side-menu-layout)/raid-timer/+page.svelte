<script lang="ts">
	import { goto } from '$app/navigation'
	import {
		BeepToggleButton,
		ControlWindowAlarmButton,
		RaidServerTabs
	} from '$features/control-raid-timer-option'
	import { META } from '$shared/config'
	import { lang } from '$shared/model'
	import { PageHeader } from '$shared/ui/page-header'
	import { RaidTabList, RaidTimeView } from '$widgets/raid'

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

<section class="flex h-[calc(100vh-var(--header-h)*2)] flex-col">
	<PageHeader title={{ kr: '레이드 타이머', en: ' Raid Timer' }}>
		<div slot="nextTitleSlot" class="flex gap-2">
			<RaidServerTabs />
			<ControlWindowAlarmButton />
			<BeepToggleButton />
		</div>
	</PageHeader>
	<RaidTabList let:raid>
		<RaidTimeView {raid} />
	</RaidTabList>
</section>
