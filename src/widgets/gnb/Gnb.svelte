<script lang="ts">
	import { page } from '$app/stores'
	import { MENUS, type MenuType } from '$entities/menus'
	import { NewBadge } from '$shared/badge'
	import { Icon } from '$shared/icon'
	import { _objKeys, cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { TextByLang } from '$shared/text'

	$: getIsActive = (type: MenuType) =>
		$page.url.pathname.includes(MENUS[type].path)

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
		'port:fixed port:bottom-mobile-bottom-ad-h port:z-header port:w-full port:bg-background',
		$$restProps.class
	)}
>
	<h2 class="ir">글로벌 네비게이션</h2>
	<ul
		class={cn(
			'items-center whitespace-nowrap font-light',
			'port:grid-cols-max port:grid port:h-gnb-h port:p-1',
			$lang === 'kr' ? 'port:grid-cols-3' : 'port:grid-cols-2'
		)}
	>
		{#each _objKeys(MENUS) as menuType (menuType)}
			{#if !($lang === 'en' && menuType === 'raid')}
				{@const isActive = getIsActive(menuType)}
				<li class="port:h-full">
					<a
						href="{$langPath}{MENUS[menuType].path}"
						class={cn(
							'rounded-md land:flex land:h-gnb-h land:items-center land:gap-2 land:px-2 land:transition-colors',
							'port:flex-col-center port:h-full port:gap-[1px]',
							isActive
								? 'font-bold text-gray-12'
								: 'land:hover:font-bold land:hover:text-gray-12'
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
								<NewBadge startDate="Wed Mar 12 2025 19:27:25" />
							{/if}
						</span>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
