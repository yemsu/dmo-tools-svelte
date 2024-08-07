<script lang="ts">
	import { activeMenu, mySeals, type Menus } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'

	const menuDataList: {
		type: Menus
		name: string
		icon: { name: string; width: number; height: number; class?: string }
	}[] = [
		{
			type: 'EVERY',
			name: '모든 씰',
			icon: {
				name: 'streamline:cards',
				width: 18,
				height: 18,
				class: 'mb-[2px]'
			}
		},
		{
			type: 'CALC',
			name: '씰 계산기',
			icon: {
				name: 'circum:calculator-2',
				width: 24,
				height: 24,
				class: 'mb-[1px]'
			}
		},
		{
			type: 'MY',
			name: '보유 씰',
			icon: {
				name: 'ph:treasure-chest-light',
				width: 21,
				height: 21
			}
		}
	]
</script>

<Inner size="full" class="absolute bottom-0 left-0 h-[50px] w-full bg-gray-800">
	<nav>
		<h2 class="ir">글로벌 네비게이션</h2>
		<ul
			class={cn(
				'flex-center h-mobile-nav-h w-full gap-[10%] whitespace-nowrap pt-1 md:pt-0',
				'text-center text-[9px] md:text-sm'
			)}
		>
			{#each menuDataList as menuData (menuData.type)}
				<li>
					<button
						class={cn(
							'flex-col-center gap-[2px] px-[2vw] transition-opacity md:flex-row md:gap-2',
							$activeMenu === menuData.type
								? 'font-bold opacity-100'
								: 'opacity-50 hover:opacity-100'
						)}
						on:click={() => activeMenu.set(menuData.type)}
					>
						<iconify-icon
							icon={menuData.icon.name}
							width={menuData.icon.width}
							height={menuData.icon.height}
							class={cn(menuData.icon.class)}
						/>
						<span>
							{menuData.name}
							{#if menuData.type === 'MY'}
								<span>({$mySeals.length})</span>
							{/if}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</Inner>
