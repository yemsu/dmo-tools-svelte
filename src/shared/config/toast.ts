import type { SealData } from '$entities/seals'

export const TOAST = {
	NEED_LOGIN: {
		kr: '로그인 후 이용할 수 있는 기능입니다.',
		en: 'This feature is available after logging in.'
	},
	WELCOME: (nickname: string) => ({
		kr: `환영합니다 ${nickname}님!`,
		en: `Welcome, ${nickname}!`
	}),
	CHANGE_NICK: (nickname: string) => ({
		kr: `닉네임이 "${nickname}"으로 변경되었습니다.`,
		en: `Your nickname has been changed to "${nickname}".`
	}),
	LOGOUT: {
		kr: '로그아웃이 완료되었습니다.',
		en: 'Log out complete.'
	},
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
	}),
	// seal
	SEAL_COUNT_UPDATE: (seal: SealData, sealCount: number) => ({
		kr: `${seal.name}씰 보유 개수가 ${sealCount}개로 업데이트 되었습니다.`,
		en: `Your ${seal.engName} seal count has been updated to ${sealCount}`
	}),
	REMOVED_SEAL_PRICE: {
		kr: '씰 가격 설정이 제거되었습니다.',
		en: 'The seal price setting has been removed.'
	},
	SEAL_COUNT_CHANGED: {
		kr: '씰 개수가 변경되었습니다.',
		en: 'The quantity of seals has been changed.'
	},
	SEAL_PRICE_UPDATED: {
		kr: '씰 가격이 설정되었습니다.',
		en: 'The seal price has been set.'
	},
	CHARACTER_ADDED: {
		kr: '캐릭터가 추가되었습니다.',
		en: 'The character has been added.'
	},
	CHARACTER_NAME_CHANGED: {
		kr: '캐릭터명이 변경되었습니다.',
		en: 'The character name has been changed.'
	}
}
