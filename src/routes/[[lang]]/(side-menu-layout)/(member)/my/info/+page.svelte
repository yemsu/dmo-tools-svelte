<script lang="ts">
	import { alarmMinute, crrServerType, GAME_SERVERS } from '$entities/raid'
	import { user } from '$entities/user'
	import { LogoutButton } from '$features/user/control-session'
	import { ChangeNickname, ResignButton } from '$features/user/update-user-info'
	import { checkMember } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { LeftTitleTable } from '$shared/table'
	import type { LeftTitleTableData } from '$shared/table/types'
	import { TextByLang, Title } from '$shared/text'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember($lang)
	})

	$: baseInfoMap = [
		{
			i18n: 'user.nickname',
			desc: $user?.nickname
		},
		{
			i18n: 'user.email',
			desc: $user?.email
		},
		{
			i18n: 'user.logout'
		},
		{
			i18n: 'user.withdrawal'
		}
	] as LeftTitleTableData[]

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

<section class="flex-center flex-1">
	<Inner size="content-middle">
		<div class="flex w-full flex-col gap-3">
			<Title class="w-full">
				<TextByLang text="내 정보" engText="My Information" />
			</Title>
			<LeftTitleTable infoItems={baseInfoMap} let:infoItemData>
				{#if infoItemData.i18n === 'user.nickname'}
					<ChangeNickname />
				{:else if infoItemData.i18n === 'user.logout'}
					<LogoutButton />
				{:else if infoItemData.i18n === 'user.withdrawal'}
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
	</Inner>
</section>
