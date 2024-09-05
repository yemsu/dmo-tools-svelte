<script lang="ts">
	import { page } from '$app/stores'
	import { type GachaData } from '$entities/gacha'
	import gachaSymbolImg from '$lib/images/gacha/gacha-symbol.jpg'
	import { cn } from '$shared/lib'

	let activeMenuId = 1

	const menus = [
		{ id: 1, text: '데이터 소환' },
		{ id: 2, text: '디지털 드로우 (준비중)' }
	]

	const gachaTabContents: Record<
		number,
		{ title: string; gachaList: GachaData[] }
	> = {
		1: {
			title: '소환할 데이터를 선택하세요.',
			gachaList: $page.data.gachaSummons
		},
		2: {
			title: '디지털 드로우를 선택하세요.',
			gachaList: []
		}
	}

	const selectGachaType = (menuId: number) => {
		activeMenuId = menuId
	}
</script>

<div
	class="flex-center absolute left-0 top-0 mb-5 w-full -translate-y-full bg-primary-20/60"
>
	{#each menus as menu (menu.id)}
		<button
			class={cn(
				'flex-center h-tab-h flex-1 gap-2 py-1',
				'border-2 text-xs transition-all',
				'hover:border-primary-50 hover:bg-primary-50/20',
				activeMenuId === menu.id
					? 'border-primary-50 bg-primary-50/20'
					: 'border-transparent'
			)}
			on:click={() => selectGachaType(menu.id)}
		>
			<img
				src={gachaSymbolImg}
				alt=""
				width="22"
				height="23"
				class="w-[1.2em]"
			/>
			{menu.text}
		</button>
	{/each}
</div>
<div
	class="absolute -left-content-side top-1/2 z-10 w-[100vw] -translate-y-1/2 md:w-full"
>
	<slot
		gachaList={gachaTabContents[activeMenuId].gachaList}
		title={gachaTabContents[activeMenuId].title}
	></slot>
</div>
