<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { MENUS, type MenuType } from '$entities/menus'
	import NewBadge from '$shared/badge/NewBadge.svelte'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'

	type MenuData = {
		type: MenuType
		icon: { name: string; width: number; height: number; class?: string }
	}

	const menuDataList: MenuData[] = [
		{
			type: 'calc',
			icon: {
				name: 'circum:calculator-2',
				width: 24,
				height: 24,
				class: 'mb-[1px]'
			}
		},
		{
			type: 'raid',
			icon: {
				name: 'ph:timer',
				width: 19,
				height: 19,
				class: '-ml-[1px] pt-[4px] pb-[1px]'
			}
		},
		{
			type: 'gacha',
			icon: {
				name: 'mingcute:random-line',
				width: 19,
				height: 19,
				class: '-ml-[1px] pt-[4px] pb-[1px]'
			}
		}
	]

	$: getIsActive = (menuType: MenuType) =>
		$page.url.pathname === MENUS[menuType].path
</script>

<div class="h-gnb-h w-full">
	<Inner size="full" class="flex-center md:gap-5">
		<nav class="flex-center flex-1 rounded-t-[20px] bg-gray-800">
			<h2 class="ir">글로벌 네비게이션</h2>
			<ul
				class={cn(
					'flex h-gnb-h w-full items-center justify-between whitespace-nowrap p-1 md:p-1.5',
					'max-w-[600px]',
					'text-center text-xs4 md:text-sm'
				)}
			>
				{#each menuDataList as menuData (menuData.type)}
					{@const isActive = getIsActive(menuData.type)}
					<li class={cn('h-full', isActive ? 'w-[45%] md:w-[35%]' : 'flex-1')}>
						<a
							href={MENUS[menuData.type].path}
							class={cn(
								'flex-col-center h-full px-1 md:flex-row md:gap-2',
								'rounded-t-[15px] leading-none transition-opacity',
								isActive
									? 'flex-row gap-1 bg-primary-20 py-2 text-xs font-semibold opacity-100 md:gap-2 md:px-8 md:text-sm'
									: 'gap-[0.4em] opacity-50 hover:opacity-100'
							)}
						>
							<iconify-icon
								icon={menuData.icon.name}
								width={menuData.icon.width}
								height={menuData.icon.height}
								class={cn(menuData.icon.class)}
							/>
							<span class="relative">
								{$_(`menus.${menuData.type}`)}
								{#if menuData.type === 'gacha'}
									<NewBadge />
								{/if}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex-center h-full">
			<a
				href="https://open.kakao.com/o/skcN4IDg"
				target="_blank"
				title="새창(오픈채팅)"
				class="flex-col-center gap-[2px] px-2 opacity-50 transition-opacity hover:opacity-100 md:gap-0.5 md:px-3"
			>
				<iconify-icon
					icon="hugeicons:customer-support"
					width="20"
					height="20"
				/>
				<span class="text-xs4 md:text-xs2"> 문의/제보</span>
			</a>
		</div>
	</Inner>
</div>
