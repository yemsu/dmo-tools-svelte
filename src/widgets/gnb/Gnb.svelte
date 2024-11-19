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
			name: 'carbon:calculation',
			size: 22
		},
		raid: {
			name: 'carbon:timer',
			size: 20
		},
		gacha: {
			name: 'carbon:gem',
			size: 19
		}
	}
</script>

<nav
	class={cn(
		'landscape:gap-5',
		'portrait:fixed portrait:bottom-0 portrait:z-header portrait:w-full portrait:bg-background',
		$$restProps.class
	)}
>
	<h2 class="ir">글로벌 네비게이션</h2>
	<ul
		class={cn(
			'items-center gap-10 whitespace-nowrap font-semibold ',
			'portrait:grid-cols-max portrait:grid portrait:h-gnb-h portrait:grid-cols-3 portrait:p-1',
			isMain ? 'text-gray-11' : 'text-gray-9'
		)}
	>
		{#each _objKeys(MENUS) as menuType (menuType)}
			{#if !($lang === 'en' && menuType === 'raid')}
				{@const isActive = getIsActive(menuType)}
				<li class="portrait:h-full">
					<a
						href="/{$lang}{MENUS[menuType].path}"
						class={cn(
							'landscape:flex landscape:h-gnb-h landscape:items-center landscape:gap-2 landscape:px-2 landscape:transition-colors landscape:hover:font-bold landscape:hover:text-gray-12',
							'portrait:flex-col-center portrait:h-full portrait:gap-[1px]',
							isActive && 'font-bold text-gray-12'
						)}
					>
						<span
							class={cn('flex-center landscape:h-[20px] landscape:w-[20px]')}
						>
							<Icon
								icon={menuIcons[menuType].name}
								size={menuIcons[menuType].size}
							/>
						</span>
						<span class="portrait:text-sub-sm relative">
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
