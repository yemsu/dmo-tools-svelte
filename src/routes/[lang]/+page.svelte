<script lang="ts">
	import { page } from '$app/stores'
	import { META, PATH } from '$shared/config'
	import { contentUrl } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import { MainBanner } from '$widgets/banner'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE}</title>
	<meta name="description" content={META.COMMON.DESC} />
</svelte:head>

<Section>
	<div class="scroll-box flex flex-1 flex-col">
		<div class="flex-center flex-1 sm:hidden">
			<div class="flex-col-center gap-1">
				<p class="text-right text-gray-300">디지몬 마스터즈 도구 모음</p>
				<p
					class="text-logo font-tiny text-[40px] font-semibold leading-none md:text-[60px]"
				>
					DMO tools
				</p>
			</div>
		</div>
		<div class="flex flex-col gap-3 md:gap-5">
			<MainBanner
				src={contentUrl('/main/main-banner-calc.png')}
				href="/{$page.data.lang}{PATH.CALCULATOR}"
				title="씰 효율 계산기"
				subTitle="보유 씰을 설정하고 목표 스탯까지 씰 효율을 간편하게 확인해 보세요."
				xDir="right"
				yDir="top"
				colorType="primary-30"
			/>
			<MainBanner
				src={contentUrl('/main/main-banner-raid.png')}
				href="/{$page.data.lang}{PATH.RAID_TIMER}"
				title="레이드 타이머"
				subTitle="보스 출현 시간을 제보하여 유저들과 공유하고 알림을 받아보세요."
				xDir="left"
				yDir="bottom"
				colorType="primary-40"
			/>
			<MainBanner
				src={contentUrl('/main/main-banner-gacha.png')}
				href="/{$page.data.lang}{PATH.GACHA}"
				title="뽑기 시뮬레이터"
				subTitle="뽑기 시뮬레이터로 운을 미리 시험해 보세요."
				xDir="right"
				yDir="bottom"
				colorType="primary-50"
			/>
		</div>
	</div>
</Section>
