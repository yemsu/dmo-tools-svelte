<script lang="ts">
	import { PUBLIC_ADSENSE_CLIENT } from '$env/static/public'
	import { cn } from '$shared/lib'
	import { AD_SLOTS, type AdType } from '$widgets/adsense/config'
	import { onMount } from 'svelte'

	export let adType: AdType
	export let randomFormat: boolean = true

	const { class: className, ...restProps } = $$restProps

	onMount(() => {
		setTimeout(() => {
			window.adsbygoogle.push({})
		}, 100)
	})
</script>

<ins
	class={cn('adsbygoogle size-full', className)}
	style="display:block"
	data-ad-client={PUBLIC_ADSENSE_CLIENT}
	data-ad-slot={AD_SLOTS[adType]}
	data-ad-format={randomFormat ? 'auto' : undefined}
	data-full-width-responsive={randomFormat ? 'true' : 'false'}
	{...restProps}
></ins>
