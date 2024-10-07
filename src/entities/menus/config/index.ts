import { PATH } from '$shared/config'

export const MENUS = {
	calc: { name: '효율 계산기', path: PATH.CALCULATOR },
	raid: { name: '레이드 타이머', path: PATH.RAID_TIMER },
	gacha: { name: '뽑기 시뮬레이터', path: PATH.GACHA }
} as const
