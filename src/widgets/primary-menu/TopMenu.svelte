<script lang="ts">
	import { cn, isLandscape } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { Gnb } from '$widgets/gnb'
	import { Header } from '$widgets/header'
	import { RaidBar } from '$widgets/raid-bar'
</script>

<div class={$$restProps.class}>
	{#if !$isLandscape}
		<Inner class="h-header-h">
			<Header class={cn('flex h-full items-center justify-between')} />
			{#if $lang === 'kr'}
				<RaidBar />
			{/if}
		</Inner>
		<Gnb />
	{/if}
</div>
