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
		'land:gap-5',
		'port:bottom-mobile-bottom-ad-h port:fixed port:z-header port:w-full port:bg-background',
		$$restProps.class
	)}
>
	<h2 class="ir">글로벌 네비게이션</h2>
	<ul
		class={cn(
			'items-center whitespace-nowrap font-semibold ',
			'port:grid-cols-max port:grid port:h-gnb-h port:grid-cols-3 port:p-1',
			isMain ? 'text-gray-11' : 'text-gray-9'
		)}
	>
		{#each _objKeys(MENUS) as menuType (menuType)}
			{#if !($lang === 'en' && menuType === 'raid')}
				{@const isActive = getIsActive(menuType)}
				<li class="port:h-full">
					<a
						href="/{$lang}{MENUS[menuType].path}"
						class={cn(
							'land:flex land:h-gnb-h land:items-center land:gap-2 land:px-2 land:transition-colors land:hover:font-bold land:hover:text-gray-12',
							'port:flex-col-center port:h-full port:gap-[1px]',
							isActive && 'font-bold text-gray-12'
						)}
					>
						<span class={cn('flex-center land:h-[20px] land:w-[20px]')}>
							<Icon
								icon={menuIcons[menuType].name}
								size={menuIcons[menuType].size}
							/>
						</span>
						<span class="relative port:text-sub-sm">
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
