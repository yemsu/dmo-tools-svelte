<script lang="ts">
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { Header } from '$shared/ui/header'
	import { RaidBar } from '$widgets/raid-bar'
</script>

<div
	class={cn(
		'fixed left-0 top-0 z-header bg-background',
		'w-side-menu-w h-full',
		$$restProps.class
	)}
>
	<Inner size="full" class={cn('relative')}>
		<Header />
		{#if $lang === 'kr'}
			<RaidBar class="mt-6" />
		{/if}
	</Inner>
</div>
