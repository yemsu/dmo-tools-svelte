export const TOAST = {
	NEED_LOGIN: {
		kr: '로그인 후 이용할 수 있는 기능입니다.',
		en: 'This feature is available after logging in.'
	},
	JOIN: (nickname: string) => ({
		kr: `환영합니다 ${nickname}님!`,
		en: `Welcome, ${nickname}!`
	}),
	CHANGE_NICK: (nickname: string) => ({
		kr: `닉네임이 "${nickname}"으로 변경되었습니다.`,
		en: `Your nickname has been changed to "${nickname}".`
	}),
	RESIGN: {
		SUCCESS: {
			kr: '회원 탈퇴가 완료되었습니다.',
			en: 'Your account has been successfully deleted.'
		},
		FAIL: {
			kr: '회원 탈퇴에 실패하였습니다. 관리자에게 문의해주세요.',
			en: 'Failed to delete your account. Please contact the administrator.'
		}
	},
	GACHA: {
		CLEAN_INVENTORY: {
			kr: '획득한 아이템이 모두 제거되었습니다.',
			en: 'All acquired items have been removed.'
		}
	},
	CHANGE_LANG: () => ({
		kr: `사이트 언어가 한국어로 설정되었습니다.`,
		en: 'The site language has been set to English.'
	})
}
