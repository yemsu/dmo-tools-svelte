<script lang="ts">
	import { TextByLang } from '$shared/text'
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2024.11.07"
	time="22:50"
	title={{
		kr: '신규 회원 대상 효율 계산기 씰 설정 오류 수정 안내',
		en: 'Fixing Efficiency Calculator Seal Setting Error for New Users'
	}}
>
	<p>
		<TextByLang
			text="신규 회원 여러분께 발생했던 효율 계산기 내 씰 설정 관련 오류를
		수정하였습니다."
			engText="We have fixed the error related to seal settings in the efficiency calculator that was affecting new users."
		/>
		<br />
		<TextByLang
			text="오류 대상자 분들은 브라우저 캐시를 삭제하고 재로그인해주시기 바랍니다. 문제가 지속되는 경우 문의해주시면 신속하게 확인하여 도와드리겠습니다."
			engText="If you are one of the affected users, please clear your browser cache and log in again. If the issue persists, please reach out to us and we will investigate and assist you promptly."
		/>
	</p>
	<ul class="flex flex-col gap-2">
		<li>
			<TextByLang
				text="오류 대상 : 11월 6일 오후 5시 이후 신규 가입 유저"
				engText="Affected Users: New users who signed up after 5 PM KST (Korea Standard Time) on November 6th"
			/>
		</li>
		<li>
			<TextByLang
				text="오류 내용 : 효율 계산기 내 캐릭터 기능 추가로 인한 씰 설정 오류"
				engText="Issue: Error in seal settings due to the addition of character functionality in the efficiency calculator"
			/>
		</li>
	</ul>
	<p><TextByLang text="감사합니다." engText="Thank you." /></p>
</NoticeItem>
