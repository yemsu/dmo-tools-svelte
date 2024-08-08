export const $remove = <T extends { id: number }>(arr: T[], _id: number) => {
	return arr.filter(({ id }) => id !== _id)
}
