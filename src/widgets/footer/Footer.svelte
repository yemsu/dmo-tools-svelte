<script lang="ts">
	import { Button } from '$shared/button'
	import { PATH } from '$shared/config'
	import { cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { Inner } from '$shared/section'
	import { ThemeToggleButton } from '$shared/ui/theme'
	import { LangButton } from '$widgets/header'
	import SupportGuide from './SupportGuide.svelte'

	export let align: 'left' | 'center' = 'center'
	$: isAlignCenter = align === 'center'

	const links = [
		{
			href: `${$langPath}${PATH.PRIVACY_POLICY}`,
			text: {
				kr: '개인정보처리방침',
				en: 'Private Policy'
			}
		}
	]
</script>

<footer
	class={cn(
		'w-full py-8 text-sub-lg text-gray-10 land:mt-8',
		'port:pb-[calc(var(--gnb-h)+var(--mobile-bottom-ad-h))]',
		$$restProps.class
	)}
>
	<Inner class={cn(isAlignCenter && 'flex-center flex-col text-center')}>
		<div class="flex items-center justify-between">
			<!-- <p class="font-tiny text-3xl leading-none">DMO tools</p> -->
			<div class="flex-center gap-2">
				<ThemeToggleButton />
				<LangButton />
			</div>
		</div>
		<div class="mt-4 flex flex-wrap gap-2">
			{#each links as { href, text } (text)}
				<Button variant="link" size="text" {href} class="font-semibold">
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
	</Inner>
</footer>
