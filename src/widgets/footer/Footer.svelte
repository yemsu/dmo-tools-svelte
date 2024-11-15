<script lang="ts">
	import { Button } from '$shared/button'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { LangButton } from '$widgets/header'
	import { ThemeToggleButton } from '$shared/ui/theme'
	import SupportGuide from './SupportGuide.svelte'

	const links = [
		{
			href: `/${$lang}{PATH.PRIVACY_POLICY}`,
			text: {
				kr: '개인정보처리방침',
				en: 'Private Policy'
			}
		}
	]
</script>

<footer class="mt-8 w-full py-8">
	<Inner class="text-gray-11 md:text-center">
		<div class="flex items-center md:justify-center sm:justify-between">
			<p class="font-tiny leading-none md:text-2xl sm:text-3xl">DMO tools</p>
			<div class="flex-center gap-2 md:hidden">
				<ThemeToggleButton />
				<LangButton />
			</div>
		</div>
		<div class="mt-4 text-sm">
			<div class="flex gap-4 md:justify-center">
				{#each links as { href, text } (text)}
					<Button size="text" {href} class="font-semibold">
						{text[$lang]}
					</Button>
					<div class="h-[1.1em] w-[1px] bg-gray-5"></div>
				{/each}
				<SupportGuide />
			</div>
			<p class="mt-4">
				© 2024. DMO tools All rights reserved. <br />
				This site is not associated with Digimon Masters Online.
			</p>
		</div>
	</Inner>
</footer>
