<script lang="ts">
	import { _ } from 'svelte-i18n'
	import { page } from '$app/stores'
	import { MENUS, type MenuData, type MenuType } from '$entities/menus'
	import NewBadge from '$shared/badge/NewBadge.svelte'
	import { cn } from '$shared/lib'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	export let menuData: MenuData
	const { type, icon } = menuData

	$: getIsActive = (type: MenuType) =>
		$page.url.pathname.includes(MENUS[type].path)
	$: isActive = getIsActive(type)
</script>

<li class="h-full">
	<a
		href="/{$page.data.lang}{MENUS[type].path}"
		class={cn(
			'flex-center h-full hover:text-point',
			isActive && 'font-bold text-point'
		)}
	>
		<!-- <iconify-icon
			icon={icon.name}
			width={icon.width}
			height={icon.height}
			class={cn(icon.class)}
		/> -->
		<span class="relative">
			<TextByLang data={MENUS[type]} />
			{#if type === 'gacha'}
				<NewBadge />
			{/if}
		</span>
	</a>
</li>
