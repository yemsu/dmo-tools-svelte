import { PATH } from '$shared/config'

export const MENUS = {
	SETTING: { name: '씰 설정', path: PATH.SETTING_SEALS },
	CALC: { name: '효율 계산기', path: PATH.CALCULATOR },
	MY: { name: '보유', path: PATH.MY_SEALS },
	RAID: { name: '레이드 타이머', path: PATH.RAID_TIMER },
	GACHA: { name: '뽑기 시뮬레이터', path: PATH.GACHA }
} as const
