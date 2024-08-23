<script lang="ts">
	import { page } from '$app/stores'
	import { MENUS, type MenuType } from '$entities/menus'
	import { mySealCounts } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
	import GnbButton from './GnbButton.svelte'

	type MenuData = {
		type: MenuType
		icon: { name: string; width: number; height: number; class?: string }
	}

	const menuDataList: MenuData[] = [
		{
			type: 'SETTING',
			icon: {
				name: 'streamline:cards',
				width: 18,
				height: 18,
				class: 'mb-[2px]'
			}
		},
		{
			type: 'CALC',
			icon: {
				name: 'circum:calculator-2',
				width: 24,
				height: 24,
				class: 'mb-[1px]'
			}
		},
		{
			type: 'MY',
			icon: {
				name: 'ph:treasure-chest-light',
				width: 21,
				height: 21
			}
		},
		{
			type: 'RAID',
			icon: {
				name: 'ph:timer',
				width: 19,
				height: 19,
				class: '-ml-[1px]'
			}
		}
	]
</script>

<div class="h-gnb-h w-full">
	<Inner size="full" class="flex  items-center">
		<nav class="flex-1 rounded-full bg-gray-800">
			<h2 class="ir">글로벌 네비게이션</h2>
			<ul
				class={cn(
					'flex h-gnb-h w-full items-center justify-evenly whitespace-nowrap p-2',
					'text-center text-xs4 md:text-sm'
				)}
			>
				{#each menuDataList as menuData (menuData.type)}
					<li>
						<GnbButton
							path={MENUS[menuData.type].path}
							class={cn(
								'flex-col-center leading-none transition-opacity md:flex-row md:gap-2',
								$page.url.pathname === MENUS[menuData.type].path
									? 'h-full flex-row gap-1 rounded-full bg-primary-20 px-3 py-2 text-xs font-semibold opacity-100 md:gap-2 md:px-6 md:text-sm'
									: 'gap-[2px] px-2 opacity-50 hover:opacity-100'
							)}
						>
							<iconify-icon
								icon={menuData.icon.name}
								width={menuData.icon.width}
								height={menuData.icon.height}
								class={cn(menuData.icon.class)}
							/>
							<span>
								{MENUS[menuData.type].name}
								{#if menuData.type === 'MY'}
									<span>({$mySealCounts.length})</span>
								{/if}
							</span>
						</GnbButton>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex-center h-full">
			<a
				href="https://open.kakao.com/o/skcN4IDg"
				target="_blank"
				title="새창(오픈채팅)"
				class="flex-col-center gap-[2px] px-1.5 opacity-50 transition-opacity hover:opacity-100 md:gap-0.5 md:px-3"
			>
				<iconify-icon
					icon="hugeicons:customer-support"
					width="20"
					height="20"
				/>
				<span class="text-xs2"> 문의/제보</span>
			</a>
		</div>
	</Inner>
</div>
