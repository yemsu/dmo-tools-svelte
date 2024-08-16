// See https://kit.svelte.dev/docs/types#app
import type { SealData, SealPrice } from '$entities/seals'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			sealsFetched: string
			sealPricesFetched: string
			// 필요한 다른 필드들도 여기에 추가하세요
		}
		interface PageData {
			seals: SealData[]
			sealPrices: SealPrice[]
		}
		// interface PageState {}
		// interface Platform {}
	}
}
