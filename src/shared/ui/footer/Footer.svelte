<script lang="ts">
	import { Button } from '$shared/button'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { LangButton } from '$shared/ui/header'
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

<footer class={cn('mt-8 w-full py-8', $$restProps.class)}>
	<Inner class="text-gray-10">
		<div class="flex items-center justify-between">
			<!-- <p class="font-tiny text-3xl leading-none">DMO tools</p> -->
			<div class="flex-center gap-2">
				<ThemeToggleButton />
				<LangButton />
			</div>
		</div>
		<div class="mt-4 text-sm">
			<div class="flex flex-wrap gap-2">
				{#each links as { href, text } (text)}
					<Button size="text" {href} class="font-semibold">
						{text[$lang]}
					</Button>
					<div class="h-[1.1em] w-[1px] bg-gray-5"></div>
				{/each}
				<SupportGuide />
			</div>
			<p class="mt-4 font-light">
				© 2024. DMO tools All rights reserved. <br />
				This site is not associated with Digimon Masters Online.
			</p>
		</div>
	</Inner>
</footer>
