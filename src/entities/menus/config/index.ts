import { PATH } from '$shared/config'

export const MENUS = {
	calc: {
		name: '씰 효율 계산기',
		engName: 'Seal Calculator',
		path: PATH.CALCULATOR
	},
	raid: { name: '레이드 타이머', engName: 'Raid Timer', path: PATH.RAID_TIMER },
	gacha: {
		name: '뽑기 시뮬레이터',
		engName: 'Gacha Simulator',
		path: PATH.GACHA
	}
} as const
