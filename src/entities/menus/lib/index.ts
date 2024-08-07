import { MENUS, type Menus } from '$entities/menus'

export const getActiveMenuName = (menuType: Menus['type']) => {
	const findMenu = MENUS.find(({ type }) => type === menuType)
	if (!findMenu) {
		throw Error(
			`getActiveMenuName: "${menuType}"은 메뉴명이 아닙니다. 다시 확인해주세요.`
		)
	}
	return findMenu.name
}
