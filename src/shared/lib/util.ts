export const _remove = <T extends { id: number }>(arr: T[], _id: number) => {
	return arr.filter(({ id }) => id !== _id)
}
export const _objKeys = <T extends { [key: string]: unknown }>(obj: T) => {
	const objKeys = Object.keys(obj) as (keyof typeof obj)[]
	return objKeys
}
