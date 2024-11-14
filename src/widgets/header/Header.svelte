<script lang="ts">
	import { AuthButton } from '$shared/layout'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { ThemeToggleButton } from '$shared/ui/theme'
	import Gnb from './Gnb.svelte'
	import LangButton from './LangButton.svelte'
</script>

<header class="z-header fixed top-0 w-full bg-background">
	<Inner
		size="full"
		class="relative flex h-header-h items-center justify-between"
	>
		<h1 class="font-tiny text-[26px] font-semibold leading-none">
			<a
				href="/{$lang}"
				class="block"
				title={$lang === 'kr' ? '메인으로' : 'Go to Main Page'}
			>
				DMO tools
			</a>
		</h1>
		<Gnb class="sm:hidden" />
		<div class="flex-center gap-2">
			<AuthButton />
			<div class="flex-center sm:hidden">
				<ThemeToggleButton />
				<LangButton />
			</div>
		</div>
	</Inner>
</header>
<Gnb class="md:hidden" />
