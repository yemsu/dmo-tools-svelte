<script lang="ts">
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { Gnb } from '$shared/ui/gnb'
	import { Header } from '$shared/ui/header'
	import { RaidBar } from '$widgets/raid-bar'
</script>

<div class={$$restProps.class}>
	<Inner>
		<Header
			class={cn(
				'flex h-header-h items-center justify-between',
				$$restProps.class
			)}
		/>
		<RaidBar />
	</Inner>
	<Gnb />
</div>
