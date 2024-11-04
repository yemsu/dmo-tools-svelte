<script lang="ts">
	import { page } from '$app/stores'
	import { AuthButton } from '$shared/layout'
	import LangButton from '$shared/layout/ui/LangButton.svelte'
	import { Inner } from '$shared/section'
	import type { LangType } from '$shared/types'

	$: lang = $page.data.lang as LangType
</script>

<header>
	<Inner
		size="full"
		class="relative flex h-header-h items-center justify-between"
	>
		<h1 class="font-tiny text-2xl font-semibold leading-none md:text-3xl">
			<a
				href="/{lang}"
				class="text-logo block"
				title={lang === 'kr' ? '메인으로' : 'Go to Main Page'}
			>
				DMO tools
			</a>
		</h1>
		<div class="flex-center gap-2">
			<AuthButton />
			<LangButton />
		</div>
	</Inner>
</header>
