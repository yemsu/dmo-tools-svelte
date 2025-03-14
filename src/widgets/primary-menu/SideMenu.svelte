<script lang="ts">
	import { cn, isLandscape } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Footer } from '$widgets/footer'
	import { Gnb } from '$widgets/gnb'
	import { Header } from '$widgets/header'
	import { RaidBar } from '$features/raid/display-raid-bar'
</script>

<div
	class={cn(
		'fixed left-0 top-0 z-header flex flex-col border-r border-gray-3 bg-background',
		'h-full w-side-menu-w',
		$$restProps.class
	)}
>
	{#if $isLandscape}
		<div class="px-content-side">
			<Header>
				<Gnb />
				<div class="my-6 border-b border-gray-3 port:hidden"></div>
			</Header>
		</div>

		<div class="mt-auto">
			{#if $lang === 'kr'}
				<RaidBar />
			{/if}
			<Footer align="left" />
		</div>
	{/if}
</div>
