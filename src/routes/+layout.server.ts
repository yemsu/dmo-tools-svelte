export const load = (event: { locals: App.Locals }) => {
	return {
		seals: JSON.parse(event.locals.sealsFetched),
		sealPrices: JSON.parse(event.locals.sealPricesFetched)
	}
}
