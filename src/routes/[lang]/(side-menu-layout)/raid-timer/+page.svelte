<script lang="ts">
	import { goto } from '$app/navigation'
	import {
		BeepToggleButton,
		ControlWindowAlarmButton,
		RaidServerTabs
	} from '$features/control-raid-timer-option'
	import { META } from '$shared/config'
	import { lang } from '$shared/model'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
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

<Section>
	<div class="flex items-center gap-4">
		<Title class="leading-none">레이드 타이머</Title>
		<div class="flex items-center gap-2">
			<RaidServerTabs />
			<ControlWindowAlarmButton />
			<BeepToggleButton />
		</div>
	</div>
	<RaidTabList let:raid>
		<RaidTimeView {raid} />
	</RaidTabList>
</Section>
