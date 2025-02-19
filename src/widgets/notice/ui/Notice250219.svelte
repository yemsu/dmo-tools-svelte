<script lang="ts">
	import { lang } from '$shared/model'
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2025.02.19"
	startDate="Wed Feb 19 2025 19:48:05 GMT+0900"
	modalSize="lg"
	title={{
		kr: '블룸로드몬 데이터 소환이 추가되었습니다.',
		en: 'The Seal Efficiency Calculator logic has been improved.'
	}}
>
	{#if $lang === 'kr'}
		<p>
			안녕하세요, 오랜만에 인사드립니다. 모두 잘 지내고 계신가요? <br />
			이번에 블룸로드몬 데이터 소환이 새롭게 추가되어 시뮬레이터에 업데이트 하였습니다.
			<br />
			시뮬레이터로 제물 바치시고 뽑기 하시는 분들 모두 천장 전에 뽑으시길 기원합니다.
			🎊🎊🎊
			<br />
			오류 제보나 개선 의견은 언제나 환영합니다. 즐거운 디마되세요!<br />
		</p>
	{:else}
		<p>
			Hello everyone! It's been a while. How have you all been? <br />
			We've updated the simulator with newly added Bloomlordmon summoning data.
			<br />
			For those of you who make offerings and pull cards in the simulator, I hope
			you get your desired cards before hitting pity! 🎊 <br />
			Bug reports and suggestions for improvement are always welcome!
		</p>
	{/if}
</NoticeItem>
