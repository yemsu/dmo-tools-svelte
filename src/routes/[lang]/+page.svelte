<script lang="ts">
	import { MENUS } from '$entities/menus'
	import { META, PATH } from '$shared/config'
	import { cn, contentUrl } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { TextByLang } from '$shared/text'
	import { MainBanner } from '$widgets/banner'
	import { Notice } from '$widgets/notice'
	$: isKr = $lang === 'kr'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE[$lang]}</title>
	<meta name="description" content={META.COMMON.DESC[$lang]} />
</svelte:head>

<div class="lg:flex min-h-[100vh] w-full overflow-hidden pt-header-h">
	<div class="flex-col-center lg:px-10 flex-1 gap-8 px-content-side">
		<p class="flex-col-center min-h-[200px] gap-1 text-center">
			<span class="text-[clamp(12px,2vw,16px)] text-gray-11">
				<TextByLang
					text="디지몬 마스터즈 도구 모음"
					engText="Digimon Masters Tools Collection"
				/>
			</span>
			<span
				class="text-logo lg:text-[100px] font-tiny text-[clamp(50px,7vw,80px)] font-semibold leading-none"
				>DMO tools</span
			>
		</p>
		<Notice />
	</div>
	<div
		class="flex-center lg:px-0 lg:mt-0 lg:gap-[clamp(20px,20%,50px)] mx-auto mt-4 flex shrink-0 flex-col gap-4 px-content-side md:w-[clamp(720px,50%,800px)]"
	>
		<MainBanner
			src={contentUrl('/main/main-banner-calc.png')}
			href="/{$lang}{PATH.CALCULATOR}"
			title={MENUS.calc[isKr ? 'name' : 'engName']}
			subTitle={isKr
				? '보유 씰을 설정하고 목표 스탯까지의 씰 효율 우선순위를 간편하게 확인해보세요.'
				: 'Set your current seals and easily check the priority of seal efficiency to reach your target stat.'}
			xDir="right"
			yDir="top"
			colorType="primary-30"
		/>
		{#if isKr}
			<MainBanner
				src={contentUrl('/main/main-banner-raid.png')}
				href="/{$lang}{PATH.RAID_TIMER}"
				title="레이드 타이머"
				subTitle="보스 출현 시간을 제보하여 유저들과 공유하고 알림을 받아보세요."
				xDir="left"
				yDir="bottom"
				colorType="primary-40"
			/>
		{/if}
		<MainBanner
			src={contentUrl('/main/main-banner-gacha.png')}
			href="/{$lang}{PATH.GACHA}"
			title={MENUS.gacha[isKr ? 'name' : 'engName']}
			subTitle={isKr
				? '뽑기 시뮬레이터로 운을 미리 시험해 보세요.'
				: 'Test your luck in the gacha simulator!'}
			xDir="right"
			yDir="bottom"
			colorType="primary-50"
		/>
	</div>
</div>
