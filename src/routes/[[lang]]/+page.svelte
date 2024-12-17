<script lang="ts">
	import { MENUS } from '$entities/menus'
	import { META, PATH } from '$shared/config'
	import { cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { MainBanner } from '$widgets/banner'
	import { Notice } from '$widgets/notice'
	$: isKr = $lang === 'kr'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE[$lang]}</title>
	<meta name="description" content={META.COMMON.DESC[$lang]} />
</svelte:head>

<div class="overflow-hidde flex w-full flex-1 flex-col">
	<div
		class="flex-col-center flex-1 gap-4 px-content-side land:gap-[clamp(20px,5vh,50px)]"
	>
		<p class="flex-col-center gap-1 text-center">
			<span class="text-[clamp(12px,2.5vw,16px)] text-gray-11">
				<TextByLang
					text="디지몬 마스터즈 도구 모음"
					engText="Digimon Masters Tools Collection"
				/>
			</span>
			<span
				class="text-logo font-tiny text-[clamp(50px,9vw,80px)] font-semibold leading-none land:text-[100px]"
			>
				DMO tools
			</span>
		</p>
		<Notice />
	</div>
	<div
		class={cn(
			'grid w-full grid-cols-2 port:flex-1 ',
			$lang === 'kr' ? 'land:grid-cols-3' : 'land:grid-cols-2'
		)}
	>
		<MainBanner
			href="{$langPath}{PATH.CALCULATOR}"
			title="☃{MENUS.calc[isKr ? 'name' : 'engName']}☃"
			colorType="blue-1"
		>
			<slot slot="subTitle">
				{#if isKr}
					목표 스탯까지 씰 효율 우선순위를 <br class="land:hidden" /> 간편하게 확인해보세요.
				{:else}
					Easily check the priority of seal <br class="land:hidden" />
					efficiency to reach your target stat.
				{/if}
			</slot>
		</MainBanner>
		{#if isKr}
			<MainBanner
				href="{$langPath}{PATH.RAID_TIMER}"
				title="❄레이드 타이머❄"
				colorType="blue-2"
				class="port:order-2 port:col-span-2"
			>
				<slot slot="subTitle">
					보스 출현 시간을 공유하고 <br class="land:hidden" /> 알림을 받아보세요.
				</slot>
			</MainBanner>
		{/if}
		<MainBanner
			href="{$langPath}{PATH.GACHA}"
			title="🎅{MENUS.gacha[isKr ? 'name' : 'engName']}🎅"
			colorType="blue-3"
		>
			<slot slot="subTitle">
				{#if isKr}
					뽑기 시뮬레이터로 <br class="land:hidden" /> 운을 미리 시험해 보세요.
				{:else}
					Test your luck <br class="land:hidden" /> in the gacha simulator!
				{/if}
			</slot>
		</MainBanner>
	</div>
</div>
