<script lang="ts">
	import { Button } from '$shared/button'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import NoticeItem from './NoticeItem.svelte'
</script>

<NoticeItem
	date="2024.11.12"
	title={{
		kr: '사이트 도메인이 변경되었습니다.',
		en: 'The site domain has been changed.'
	}}
>
	<p>
		<TextByLang
			text="더 안정적인 운영을 위해, DMO tools의 도메인이 변경되었습니다."
			engText="For more stable operation, the domain of DMO Tools has been changed."
		/> <br />
		<TextByLang
			text="구 도메인으로 접속 시 일부 기능에 제한이 있을 수 있으니, 새 도메인으로 접속해 주세요!"
			engText="If you access through the old domain, some features may be limited. Please visit the new domain instead!"
		/>
	</p>
	<p>
		이전 도메인: https://dmo-tools.vercel.app <br />
		신규 도메인:
		<Button href="https://dmo.greuta.org/{$lang}" size="text" variant="link">
			https://dmo.greuta.org
		</Button>
	</p>
	<p>🏄‍♂️</p>
</NoticeItem>
