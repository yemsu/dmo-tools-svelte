<script lang="ts">
	import { alarmMinute, crrServerType, GAME_SERVERS } from '$entities/raid'
	import { user } from '$entities/user'
	import Button from '$shared/button/ui/Button.svelte'
	import { PATH } from '$shared/config'
	import { Input } from '$shared/form'
	import { checkMember } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import Title from '$shared/text/ui/Title.svelte'
	import {
		ChangeNickname,
		InfoItem,
		ResignButton,
		type InfoItemData
	} from '$widgets/my-info'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		checkMember()
	})

	$: baseInfoMap = [
		{
			title: '닉네임',
			desc: $user?.nickname
		},
		{
			title: '이메일',
			desc: $user?.email
		},
		{
			title: '회원 탈퇴'
		}
	] as InfoItemData[]

	$: raidInfoMap = [
		{
			title: '서버',
			desc: GAME_SERVERS[$crrServerType]
		},
		{
			title: '타이머',
			desc: `${$alarmMinute}분 전`
		},
		{
			title: '제보 횟수',
			desc: 235
		}
	] as InfoItemData[]
</script>

<Section class="mx-auto max-w-[450px]">
	<div class="flex-col-center h-full gap-6">
		<div class="flex w-full flex-col gap-3">
			<Title class="w-full">기본 정보</Title>
			<InfoItem infoItems={baseInfoMap} let:infoItemData>
				{#if infoItemData.title === '닉네임'}
					<ChangeNickname />
				{:else if infoItemData.title === '회원 탈퇴'}
					<ResignButton />
				{:else}
					{infoItemData.desc}
				{/if}
			</InfoItem>
		</div>
		<!-- <div class="flex w-full flex-col gap-3">
			<Title>레이드 타이머</Title>
			<InfoItem infoItems={raidInfoMap} let:infoItemData>
				{infoItemData.desc}
			</InfoItem>
		</div> -->
		<div class="flex w-full justify-end">
			<a href={PATH.PRIVACY_POLICY} class="text-xs2 text-gray-500"
				>개인정보처리방침</a
			>
		</div>
	</div>
</Section>
