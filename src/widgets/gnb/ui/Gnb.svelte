<script lang="ts">
	import { page } from '$app/stores'
	import { type MenuData } from '$entities/menus'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
	import GnbMenu from '$widgets/gnb/ui/GnbMenu.svelte'

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
					{#if !($page.data.lang === 'en' && menuData.type === 'raid')}
						<GnbMenu {menuData} />
					{/if}
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
