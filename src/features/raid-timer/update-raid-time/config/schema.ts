import { crrServerType, subscribeClientId } from '$entities/raid'

const NEED_VALUE = {
	kr: '보스 출현까지 남은 시간(분)을 입력해 주세요',
	en: `보스 출현까지 남은 시간(분)을 입력해 주세요`,
	check: (value: string) => value === '' || +value < 1
}

const NO_CLIENT_ID = {
	kr: 'ERROR: subscribeClientId 정보가 없습니다. 새로고침 후 다시 시도해주세요.',
	en: `ERROR: subscribeClientId 정보가 없습니다. 새로고침 후 다시 시도해주세요.`,
	check: () => !subscribeClientId.subscribe((prev) => prev)
}

const NO_SERVER_DATA = {
	kr: 'ERROR: 현재 서버 정보가 없습니다. 새로고침 후 다시 시도해주세요.',
	en: `ERROR: 현재 서버 정보가 없습니다. 새로고침 후 다시 시도해주세요.`,
	check: () => !crrServerType.subscribe((prev) => prev)
}

export const ADD_RAID_SCHEMA = {
	NEED_VALUE,
	NO_CLIENT_ID,
	NO_SERVER_DATA
}
