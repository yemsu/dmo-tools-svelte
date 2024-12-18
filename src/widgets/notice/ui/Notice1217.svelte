<script lang="ts">
	import { lang } from '$shared/model'
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2024.12.17"
	startDate="Tue Dec 17 2024 15:30:00 GMT+0900"
	modalSize="lg"
	title={{
		kr: '씰 효율 계산기 로직이 개선되었습니다.',
		en: 'The Seal Efficiency Calculator logic has been improved.'
	}}
>
	<p>🎄</p>
	{#if $lang === 'kr'}
		<p>
			기존에는 씰과 등급별 효율(능력치/금액)을 계산하여 정렬 후, <strong>
				목표 스탯까지의 리스트를 단순히 제시
			</strong>하는 방식이었는데요. 이 방식의 경우, 마지막 씰의 능력치가 높으면
			목표치를 크게 초과하여 불필요하게 비용이 증가하는 문제가 있었습니다.
		</p>
		<p>
			이를 개선하여 이제는 <strong>
				목표 스탯에 최대한 근접하면서도 효율성을 유지하는 최적의 조합을
			</strong> 찾도록 로직을 추가하였습니다. 이를 통해 최소 비용으로 원하는 스탯을
			달성하실 수 있습니다.
		</p>
		<p>
			한 유저분의 문의로 시작된 이번 개선이었는데요, 앞으로도 오류나 개선 의견이
			있으시다면 언제든 알려주세요! 즐거운 연말되세요. 감사합니다. ❄☃
		</p>
	{:else}
		<p>
			Previously, we simply <strong>listed seals in order of efficiency</strong>
			(stat gain/cost) until reaching the target stat. However, this could result
			in unnecessarily high costs when high-stat seals at the end of the list pushed
			the total far beyond the target.
		</p>
		<p>
			We've now improved our logic to <strong
				>find the optimal combination that reaches your target stat while
				maintaining efficiency</strong
			>. This means you can achieve your desired stats at the lowest possible
			cost.
		</p>
		<p>
			This update came from a user suggestion - please keep the feedback coming!
			If you spot any issues or have ideas for improvements, we'd love to hear
			them. Happy holidays! ❄☃
		</p>
	{/if}
</NoticeItem>
