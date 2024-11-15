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

<div class="flex min-h-[100vh] w-full overflow-hidden pt-header-h">
	<div class="flex-col-center flex-1 gap-8">
		<p class="flex-col-center gap-1">
			<span class="text-lg text-gray-11">
				<TextByLang
					text="디지몬 마스터즈 도구 모음"
					engText="Digimon Masters Tools Collection"
				/>
			</span>
			<span
				class="text-logo font-tiny text-[40px] font-semibold leading-none md:text-[100px]"
				>DMO tools</span
			>
		</p>
		<Notice />
	</div>
	<div
		class="flex-center flex flex-col gap-[clamp(20px,20%,50px)] md:w-[clamp(740px,100%,800px)]"
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
