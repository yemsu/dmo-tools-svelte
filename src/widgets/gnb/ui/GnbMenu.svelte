<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { MENUS, type MenuData, type MenuType } from '$entities/menus'
	import NewBadge from '$shared/badge/NewBadge.svelte'
	import { cn } from '$shared/lib'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	export let menuData: MenuData
	const { type, icon } = menuData

	$: getIsActive = (type: MenuType) =>
		$page.url.pathname.includes(MENUS[type].path)
	$: isActive = getIsActive(type)
</script>

<li class={cn('h-full', isActive ? 'w-[45%] md:w-[35%]' : 'flex-1')}>
	<a
		href="/{$page.data.lang}{MENUS[type].path}"
		class={cn(
			'flex-col-center h-full px-1 md:flex-row md:gap-2',
			'rounded-t-[15px] leading-none transition-opacity',
			isActive
				? 'flex-row gap-1 bg-primary-20 py-2 text-xs font-semibold opacity-100 md:gap-2 md:px-8 md:text-sm'
				: 'gap-[0.4em] opacity-50 hover:opacity-100'
		)}
	>
		<iconify-icon
			icon={icon.name}
			width={icon.width}
			height={icon.height}
			class={cn(icon.class)}
		/>
		<span class="relative">
			<TextByLang data={MENUS[type]} />
			{#if type === 'gacha'}
				<NewBadge />
			{/if}
		</span>
	</a>
</li>
