<script lang="ts">
	import { cn, isLandscape } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { Gnb } from '$shared/ui/gnb'
	import { Header } from '$shared/ui/header'
	import { RaidBar } from '$widgets/raid-bar'
</script>

<div class={$$restProps.class}>
	<Inner class="h-header-h">
		{#if !$isLandscape}
			<Header class={cn('flex h-full items-center justify-between')} />
			{#if $lang === 'kr'}
				<RaidBar />
			{/if}
		{/if}
	</Inner>
	<Gnb />
</div>
