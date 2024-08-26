<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import SaveUrlLink from '$shared/layout/ui/SaveUrlLink.svelte'
	import { onMount } from 'svelte'

	let showNotice = false

	onMount(() => {
		showNotice = !!window.location.search
	})

	const handleShowNotice = () => {
		if (import.meta.env.SSR) return null
		const searchParams = new URLSearchParams(window.location.search)
		showNotice = searchParams.size > 0
	}

	onMount(() => {
		handleShowNotice()
	})

	afterNavigate(() => {
		handleShowNotice()
	})
</script>

{#if showNotice}
	<div
		class="flex-center h-header-h shrink-0 gap-x-2 bg-primary-50 px-content-side text-primary-5 sm:text-xs"
	>
		<p class="text-balance break-keep font-bold">
			구글 로그인 후 url 업데이트 없이 <br class="md:hidden" /> 편리하게 사이트를
			이용할 수 있어요.
		</p>
		<SaveUrlLink />
	</div>
{/if}
