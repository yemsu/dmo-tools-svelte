<script lang="ts">
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2024.11.28"
	startDate="Tue Nov 28 2024 16:00:00 GMT+0900"
	modalSize="lg"
	title={{
		kr: '레이드별 알림/상단고정 설정 기능이 추가되었습니다!',
		en: 'The site domain has been changed.'
	}}
>
	<img
		src="/notice/raid-timer-each-control-notice.jpg"
		alt=""
		width="550"
		height="323"
	/>
	<p>
		<strong>레이드별로 알림을 설정</strong>하여 원하는 레이드의 알림만
		받아보세요! <br />
		자주 확인하거나 제보할 레이드는 <strong>상단에 고정</strong>하여 더욱
		편리하게 이용하실 수 있습니다.
	</p>
	<p>
		레이드 타이머 페이지의 우측 상단에 있는 메뉴(⋮)를 통해 알림/상단고정을 일괄
		설정/해제할 수 있습니다.
	</p>
	<p>레이드의 정렬 방식도 함께 개선되었는데요, 우선순위는 다음과 같습니다.</p>
	<ul class="flex flex-col gap-2 rounded-md bg-gray-2 p-2 px-4">
		<li>- 상단 고정 설정된 레이드</li>
		<li>- 출현이 임박한 레이드</li>
		<li>- 레이드명 가나다 순</li>
	</ul>
	<p>
		사이트 이용에 참고해 주시고, 오류나 개선 의견이 있으시다면 언제든
		알려주세요! <br /> 감사합니다. 🎅
	</p>
</NoticeItem>
