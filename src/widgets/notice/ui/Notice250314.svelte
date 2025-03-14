<script lang="ts">
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2025.03.14"
	startDate="Wed Mar 14 2025 22:55:00 GMT+0900"
	modalSize="lg"
	title={{
		kr: '씰 가격 변동 그래프 기능이 추가되었습니다!',
		en: ''
	}}
>
	<p>
		모든 씰의 가격 표시 영역에 그래프 아이콘 버튼이 새롭게 추가되었습니다! 📈
	</p>

	<img src="/notice/price-chart-popup-1.jpg" alt="" width="163" height="140" />
	<p>
		버튼을 클릭하시면 해당 씰의 가격 변동 추이를 그래프로 한눈에 확인하실 수
		있습니다. <br />
		더욱 정확한 정보 제공을 위해 기준가에서 크게 벗어나는 데이터는 자동으로 필터링하여
		표시됩니다.
	</p>
	<img src="/notice/price-chart-popup-2.jpg" alt="" width="400" height="389" />
	<p>
		다만, 가격 데이터는 수집 시점과 시장 상황에 따라 변동폭이 클 수 있으니,
		참고용으로만 활용해 주시기 바랍니다.
	</p>
	<p>
		사이트 이용에 참고해 주시고, 오류나 개선 의견이 있으시다면 언제든
		알려주세요! <br /> 감사합니다. 🎮
	</p>
</NoticeItem>
