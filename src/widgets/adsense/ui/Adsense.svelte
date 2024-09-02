<script lang="ts">
	import { cn } from '$shared/lib'
	import { AD_SLOTS, type AdType } from '$widgets/adsense/config'
	import { onMount } from 'svelte'

	export let adType: AdType
	export let randomFormat: boolean = true

	const adClient = import.meta.env.VITE_ADSENSE_CLIENT
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
	data-ad-client={adClient}
	data-ad-slot={AD_SLOTS[adType]}
	data-ad-format={randomFormat ? 'auto' : undefined}
	data-full-width-responsive={randomFormat ? 'true' : 'false'}
	{...restProps}
></ins>
