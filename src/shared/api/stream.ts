import { derived, type Stores } from 'svelte/store'

export const asyncDerivedStream = <ResponseData, InitialValue>(
	stores: Stores,
	cb: ($stores: Stores) => Promise<ResponseData>,
	initial_value?: InitialValue | ResponseData
) => {
	return derived(
		stores,
		($stores, set) => {
			Promise.resolve(
				cb($stores).then((data) => {
					set(data)
				})
			)
		},
		initial_value
	)
}
