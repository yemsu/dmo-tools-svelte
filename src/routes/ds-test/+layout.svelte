<script lang="ts">
	import AdSideFixedPc from '$widgets/adsense/ui/AdSideFixedPc.svelte'
	import AdTopFixedMobile from '$widgets/adsense/ui/AdTopFixedMobile.svelte'
	import { onMount } from 'svelte'

	onMount(() => {
		setTimeout(() => {
			if (!window.adsbygoogle) return
			window.adsbygoogle = window.adsbygoogle || []
			window.adsbygoogle.push({})
		}, 200)
	})
</script>

<AdTopFixedMobile position="left" />
<slot></slot>
<AdSideFixedPc position="left" />
<AdSideFixedPc position="right" />
