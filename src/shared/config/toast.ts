export const TOAST = {
	NEED_LOGIN: '로그인 후 이용할 수 있는 기능입니다.',
	JOIN: (nickname: string) => `환영합니다 ${nickname}님!`,
	CHANGE_NICK: (nickname: string) =>
		`닉네임이 "${nickname}"으로 변경되었습니다.`,
	RESIGN: {
		SUCCESS: '회원 탈퇴가 완료되었습니다.',
		FAIL: '회원 탈퇴에 실패하였습니다. 관리자에게 문의해주세요.'
	},
	GACHA: {
		CLEAN_INVENTORY: '획득한 아이템이 모두 제거되었습니다.'
	},
	CHANGE_LANG: (lang: string) =>
		`사이트 언어가 ${lang === 'kr' ? '한국어' : 'English'}로 설정되었습니다.`
}
