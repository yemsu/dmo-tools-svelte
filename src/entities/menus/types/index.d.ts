import type { MENUS } from '../config'

export type MenuType = keyof typeof MENUS

export type MenuData = {
	type: MenuType
	icon: { name: string; width: number; height: number; class?: string }
}
