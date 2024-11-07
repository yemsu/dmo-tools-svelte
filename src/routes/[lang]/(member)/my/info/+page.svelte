<script lang="ts">
	import { page } from '$app/stores'
	import { alarmMinute, crrServerType, GAME_SERVERS } from '$entities/raid'
	import { user } from '$entities/user'
	import { checkMember } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import { LeftTitleTable } from '$shared/table'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import Title from '$shared/text/ui/Title.svelte'
	import { ChangeNickname, ResignButton } from '$widgets/my-info'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($page.data.lang)
	})

	$: baseInfoMap = [
		{
			title: '닉네임',
			engTitle: 'Nickname',
			desc: $user?.nickname
		},
		{
			title: '이메일',
			engTitle: 'E-Mail',
			desc: $user?.email
		},
		{
			title: '회원 탈퇴',
			engTitle: 'Withdrawal'
		}
	]

	$: raidInfoMap = [
		{
			title: '서버',
			engTitle: 'Server',
			desc: GAME_SERVERS[$crrServerType]
		},
		{
			title: '타이머',
			engTitle: 'Timer',
			desc: `${$alarmMinute}분 전`
		},
		{
			title: '제보 횟수',
			engTitle: 'Report Count',
			desc: 235
		}
	]
</script>

<Section class="mx-auto max-w-[450px]">
	<div class="flex-col-center h-full gap-3">
		<div class="flex w-full flex-col gap-3">
			<Title class="w-full">
				<TextByLang text="내 정보" engText="My Information" />
			</Title>
			<LeftTitleTable infoItems={baseInfoMap} let:infoItemData>
				{#if infoItemData.title === '닉네임'}
					<ChangeNickname />
				{:else if infoItemData.title === '회원 탈퇴'}
					<ResignButton />
				{:else}
					{infoItemData.desc}
				{/if}
			</LeftTitleTable>
		</div>
		<!-- <div class="flex w-full flex-col gap-3">
			<Title>레이드 타이머</Title>
			<InfoItem infoItems={raidInfoMap} let:infoItemData>
				{infoItemData.desc}
			</InfoItem>
		</div> -->
	</div>
</Section>
