<script lang="ts">
	import { PUBLIC_ADSENSE_CLIENT } from '$env/static/public'
	import { cn } from '$shared/lib'
	import { AD_SLOTS, type AdType } from '$widgets/adsense/config'
	import { adsenseStore } from '$widgets/adsense/model'

	export let adType: AdType
	export let randomFormat: boolean = true

	let adElement: HTMLDivElement
	const { class: className, ...restProps } = $$restProps
</script>

{#if $adsenseStore.isAdVisible}
	<div bind:this={adElement} class={cn($$restProps.class)}>
		<ins
			{...restProps}
			class={cn(
				'adsbygoogle size-full',
				import.meta.env.DEV
					? 'border border-gray-5 bg-blue-9/10'
					: 'bg-background'
			)}
			data-ad-client={PUBLIC_ADSENSE_CLIENT}
			data-ad-slot={AD_SLOTS[adType]}
			data-ad-format={randomFormat ? 'auto' : undefined}
			data-full-width-responsive={randomFormat ? 'true' : 'false'}
		></ins>
	</div>
{/if}
