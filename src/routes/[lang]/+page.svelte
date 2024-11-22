<script lang="ts">
	import { MENUS } from '$entities/menus'
	import { META, PATH } from '$shared/config'
	import { contentUrl } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { MainBanner } from '$widgets/banner'
	import { Notice } from '$widgets/notice'
	$: isKr = $lang === 'kr'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE[$lang]}</title>
	<meta name="description" content={META.COMMON.DESC[$lang]} />
</svelte:head>

<div class="w-full overflow-hidden pt-header-h lg:flex land:min-h-[100vh]">
	<div class="flex-col-center flex-1 gap-4 px-content-side lg:px-10 land:gap-8">
		<p
			class="flex-col-center min-h-[130px] gap-1 text-center land:min-h-[200px]"
		>
			<span class="text-[clamp(12px,2.5vw,16px)] text-gray-11">
				<TextByLang
					text="디지몬 마스터즈 도구 모음"
					engText="Digimon Masters Tools Collection"
				/>
			</span>
			<span
				class="text-logo font-tiny text-[clamp(50px,9vw,80px)] font-semibold leading-none lg:text-[100px]"
			>
				DMO tools
			</span>
		</p>
		<Notice />
	</div>
	<div
		class="flex-center mx-auto mt-4 flex max-w-[800px] shrink-0 flex-col gap-4 px-content-side lg:mt-0 lg:w-[50%] lg:gap-[clamp(20px,20%,50px)] lg:px-0 md:min-w-[600px]"
	>
		<MainBanner
			src={contentUrl('/main/main-banner-calc.png')}
			href="/{$lang}{PATH.CALCULATOR}"
			title={MENUS.calc[isKr ? 'name' : 'engName']}
			xDir="right"
			yDir="top"
			colorType="blue-1"
		>
			<slot slot="subTitle">
				{#if isKr}
					목표 스탯까지 씰 효율 우선순위를 <br class="md:hidden" /> 간편하게 확인해보세요.
				{:else}
					Easily check the priority of seal <br class="md:hidden" />
					efficiency to reach your target stat.
				{/if}
			</slot>
		</MainBanner>
		{#if isKr}
			<MainBanner
				src={contentUrl('/main/main-banner-raid.png')}
				href="/{$lang}{PATH.RAID_TIMER}"
				title="레이드 타이머"
				xDir="left"
				yDir="bottom"
				colorType="blue-2"
			>
				<slot slot="subTitle">
					보스 출현 시간을 공유하고 <br class="md:hidden" /> 알림을 받아보세요.
				</slot>
			</MainBanner>
		{/if}
		<MainBanner
			src={contentUrl('/main/main-banner-gacha.png')}
			href="/{$lang}{PATH.GACHA}"
			title={MENUS.gacha[isKr ? 'name' : 'engName']}
			xDir="right"
			yDir="bottom"
			colorType="blue-3"
		>
			<slot slot="subTitle">
				{#if isKr}
					뽑기 시뮬레이터로 <br class="md:hidden" /> 운을 미리 시험해 보세요.
				{:else}
					Test your luck <br class="md:hidden" /> in the gacha simulator!
				{/if}
			</slot>
		</MainBanner>
	</div>
</div>
