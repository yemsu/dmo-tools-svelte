<script lang="ts">
	import {
		activeMenuType,
		getActiveMenuName,
		MENUS,
		type Menus
	} from '$entities/menus'
	import { mySeals } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'

	type MenuData = {
		type: Menus['type']
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
		}
	]
</script>

<Inner size="full" class="h-[50px] w-full bg-gray-800">
	<nav>
		<h2 class="ir">글로벌 네비게이션</h2>
		<ul
			class={cn(
				'flex-center h-gnb-h w-full gap-[4%] whitespace-nowrap py-2',
				'text-xs4 text-center md:text-sm'
			)}
		>
			{#each menuDataList as menuData (menuData.type)}
				<li>
					<button
						class={cn(
							'flex-col-center transition-opacity md:flex-row md:gap-2',
							$activeMenuType === menuData.type
								? 'h-full flex-row gap-2 rounded-full bg-primary-20 px-4 py-2 text-sm font-semibold opacity-100 md:px-6'
								: 'gap-[2px] px-2 opacity-50 hover:opacity-100'
						)}
						on:click={() => activeMenuType.set(menuData.type)}
					>
						<iconify-icon
							icon={menuData.icon.name}
							width={menuData.icon.width}
							height={menuData.icon.height}
							class={cn(menuData.icon.class)}
						/>
						<span>
							{getActiveMenuName(menuData.type)}
							{#if menuData.type === 'MY'}
								<span>({$mySeals.length})</span>
							{/if}
						</span>
					</button>
				</li>
			{/each}
			<li>
				<a
					href="https://open.kakao.com/o/skcN4IDg"
					target="_blank"
					title="새창(오픈채팅)"
					class="flex-col-center gap-[2px] px-2 opacity-50 transition-opacity hover:opacity-100 md:flex-row md:gap-2"
				>
					<iconify-icon
						icon="hugeicons:customer-support"
						width="20"
						height="20"
					/>
					<span> 문의/제보</span>
				</a>
			</li>
		</ul>
	</nav>
</Inner>
