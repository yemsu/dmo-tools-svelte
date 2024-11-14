<script lang="ts">
	import { page } from '$app/stores'
	import { MENUS, type MenuType } from '$entities/menus'
	import { NewBadge } from '$shared/badge'
	import { Icon } from '$shared/icon'
	import { _objKeys, cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { TextByLang } from '$shared/text'

	$: getIsActive = (type: MenuType) =>
		$page.url.pathname.includes(MENUS[type].path)
	$: isMain = $page.url.pathname === `/${$lang}`

	const menuIcons = {
		calc: {
			name: 'circum:calculator-2',
			size: 24,
			class: 'mb-[1px]'
		},
		raid: {
			name: 'ph:timer',
			size: 19,
			class: '-ml-[1px] pt-[4px] pb-[1px]'
		},
		gacha: {
			name: 'mingcute:random-line',
			size: 19,
			class: '-ml-[1px] pt-[4px] pb-[1px]'
		}
	}
</script>

<nav
	class={cn(
		'flex-center bg-background md:gap-5',
		'sm:z-header sm:fixed sm:bottom-0 sm:w-full',
		$$restProps.class
	)}
>
	<h2 class="ir">글로벌 네비게이션</h2>
	<ul
		class={cn(
			'flex h-gnb-h items-center justify-between gap-10 whitespace-nowrap p-1 font-semibold md:p-1.5',
			isMain ? 'text-gray-11' : 'text-gray-9'
		)}
	>
		{#each _objKeys(MENUS) as menuType (menuType)}
			{#if !($lang === 'en' && menuType === 'raid')}
				{@const isActive = getIsActive(menuType)}
				<li class="h-full">
					<a
						href="/{$lang}{MENUS[menuType].path}"
						class={cn(
							'flex-center hover:text-gray-12 h-full hover:font-bold',
							'transition-colors sm:flex-col sm:gap-[1px]',
							isActive && 'text-gray-12 font-bold'
						)}
					>
						<Icon
							icon={menuIcons[menuType].name}
							size={menuIcons[menuType].size}
							class={cn('md:hidden', menuIcons[menuType].class)}
						/>
						<span class="sm:text-xs5 relative">
							<TextByLang data={MENUS[menuType]} />
							{#if menuType === 'gacha'}
								<NewBadge startDate="Wed Nov 13 2024 17:37:25" />
							{/if}
						</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
