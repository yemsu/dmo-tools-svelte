<script lang="ts">
	import { page } from '$app/stores'
	import { META, PATH } from '$shared/config'
	import { cn, contentUrl } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import { MainBanner } from '$widgets/banner'
	import type { LangType } from '$shared/types'
	import { TextByLang } from '$shared/text'
	import { MENUS } from '$entities/menus'
	$: lang = $page.data.lang as LangType
	$: isKr = lang === 'kr'
</script>

<svelte:head>
	<title>{META.COMMON.TITLE[lang]}</title>
	<meta name="description" content={META.COMMON.DESC[lang]} />
</svelte:head>

<Section>
	<div class="scroll-box flex flex-1 flex-col">
		<div class={cn('flex-center flex-1', isKr && 'sm:hidden')}>
			<div class="flex-col-center gap-1">
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
		</div>
		<div class="flex min-h-[60%] flex-col gap-3 md:gap-5">
			<MainBanner
				src={contentUrl('/main/main-banner-calc.png')}
				href="/{$page.data.lang}{PATH.CALCULATOR}"
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
					href="/{$page.data.lang}{PATH.RAID_TIMER}"
					title="레이드 타이머"
					subTitle="보스 출현 시간을 제보하여 유저들과 공유하고 알림을 받아보세요."
					xDir="left"
					yDir="bottom"
					colorType="primary-40"
				/>
			{/if}
			<MainBanner
				src={contentUrl('/main/main-banner-gacha.png')}
				href="/{$page.data.lang}{PATH.GACHA}"
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
