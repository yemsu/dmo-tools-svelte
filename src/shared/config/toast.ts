import type { ServerName } from '$entities/raid'
import type { SealData } from '$entities/seals'
import { josa } from 'es-hangul'

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
	CHANGE_LANG: {
		kr: `사이트 언어가 한국어로 설정되었습니다.`,
		en: 'The site language has been set to English.'
	},
	CHANGE_RAID_SERVER: (serverName: ServerName) => ({
		kr: `게임 서버가 ${serverName}로 설정되었습니다.`,
		en: `The game server has been set to ${serverName}`
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
	CHARACTER_CHANGED: {
		kr: '현재 캐릭터가 변경되었습니다.',
		en: 'Your current character has been changed.'
	},
	CHARACTER_ADDED: {
		kr: '캐릭터가 추가되었습니다.',
		en: 'The character has been added.'
	},
	CHARACTER_NAME_CHANGED: {
		kr: '캐릭터명이 변경되었습니다.',
		en: 'The character name has been changed.'
	},
	CHARACTER_DELETED: {
		kr: '캐릭터가 삭제되었습니다.',
		en: 'The character has been deleted'
	},
	ERROR_MASSAGE_COPIED: {
		kr: '에러 메세지가 클립보드에 복사되었습니다!',
		en: 'The error message has been copied to the clipboard!'
	},
	RAID_TIME_CANCELLED: {
		kr: '레이드 제보가 취소되었습니다.',
		en: 'The raid report has been cancelled'
	},
	RAID: {
		ON_A_ALARM: (raidName: string) => ({
			kr: `${raidName} 알림이 활성화 되었습니다.`,
			en: ''
		}),
		OFF_A_ALARM: (raidName: string) => ({
			kr: `${raidName} 알림이 비활성화 되었습니다.`,
			en: ''
		}),
		ON_A_FAVORITE: (raidName: string) => ({
			kr: `${josa(raidName, '이/가')} 상단고정되었습니다.`,
			en: ''
		}),
		OFF_A_FAVORITE: (raidName: string) => ({
			kr: `${josa(raidName, '이/가')} 상단고정이 해제되었습니다.`,
			en: ''
		}),
		ON_ALL_ALARM: {
			kr: `모든 알림이 활성화 되었습니다.`,
			en: ''
		},
		OFF_ALL_ALARM: {
			kr: `모든 알림이 비활성화 되었습니다.`,
			en: ''
		},
		ON_ALL_FAVORITE: {
			kr: `모든 레이드가 상단고정되었습니다.`,
			en: ''
		},
		OFF_ALL_FAVORITE: {
			kr: `모든 레이드의 상단고정이 해제되었습니다.`,
			en: ''
		}
	}
}
