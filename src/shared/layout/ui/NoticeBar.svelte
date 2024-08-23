<script lang="ts">
	import SaveUrlLink from '$shared/layout/ui/SaveUrlLink.svelte'
	import { onMount } from 'svelte'

	let hasParams = false

	onMount(() => {
		hasParams = !!window.location.search
	})
</script>

{#if hasParams}
	<div
		class="flex-center h-header-h gap-x-2 bg-primary-50 px-content-side text-primary-5 sm:text-xs"
	>
		<p class="text-balance break-keep font-bold">
			구글 로그인 후 url 업데이트 없이 <br class="md:hidden" /> 편리하게 사이트를
			이용할 수 있어요.
		</p>
		<SaveUrlLink />
	</div>
{/if}
