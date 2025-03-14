<script lang="ts">
	import { cn, isLandscape } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { Gnb } from '$widgets/gnb'
	import { Header } from '$widgets/header'
	import { RaidBar } from '$features/raid/display-raid-bar'
</script>

<div
	class={cn(
		'fixed left-0 top-0 z-header w-full bg-background',
		$$restProps.class
	)}
>
	{#if !$isLandscape}
		<Inner class="h-header-h">
			<Header class={cn('flex h-full items-center justify-between')} />
		</Inner>
		{#if $lang === 'kr'}
			<RaidBar />
		{/if}
		<Gnb />
	{/if}
</div>
