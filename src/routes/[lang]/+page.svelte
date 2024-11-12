<script lang="ts">
	import { MENUS } from '$entities/menus'
	import { META, PATH } from '$shared/config'
	import { cn, contentUrl } from '$shared/lib'
	import { lang } from '$shared/model'
	import Section from '$shared/section/ui/Section.svelte'
	import { TextByLang } from '$shared/text'
	import { MainBanner } from '$widgets/banner'
	import { Notice } from '$widgets/notice'
	$: isKr = $lang === 'kr'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE[$lang]}</title>
	<meta name="description" content={META.COMMON.DESC[$lang]} />
</svelte:head>

<Section>
	<div class="flex h-full flex-col gap-3">
		<div
			class={cn(
				'flex-col-center min-h-[120px] flex-1 gap-1',
				isKr && 'sm:hidden'
			)}
		>
			<p class="text-right text-gray-300">
				<TextByLang
					text="디지몬 마스터즈 도구 모음"
					engText="Digimon Masters Tools Collection"
				/>
			</p>
			<p
				class="text-logo font-tiny text-[40px] font-semibold leading-none md:text-[60px]"
			>
				DMO tools
			</p>
		</div>
		<Notice />
		<div class="flex min-h-[60%] flex-col gap-3 md:gap-5">
			<MainBanner
				src={contentUrl('/main/main-banner-calc.png')}
				href="/{lang}{PATH.CALCULATOR}"
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
</Section>
